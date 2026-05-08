import { useEffect, useRef, useCallback } from 'react'
import { useISS } from '../context/ISSContext'
import { calculateSpeed } from '../utils/haversine'
import { reverseGeocode } from '../utils/geocoding'
import toast from 'react-hot-toast'

const PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://thingproxy.freeboard.io/fetch/${url}`
]

async function fetchWithFallback(targetUrl) {
  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy(targetUrl))
      if (res.ok) return await res.json()
    } catch (e) {
      console.warn(`Proxy failed: ${proxy(targetUrl)}`, e)
    }
  }
  throw new Error('All proxies failed')
}

export function useISSTracker() {
  const {
    position, setPosition,
    history,
    setSpeed,
    setLocation,
    setAstronauts,
    setLoading,
    setError,
  } = useISS()

  const prevPosRef = useRef(null)
  const prevTimeRef = useRef(null)
  const geocodeQueueRef = useRef(null)

  const fetchAstronauts = useCallback(async () => {
    try {
      const data = await fetchWithFallback('http://api.open-notify.org/astros.json')
      setAstronauts({ number: data.number, people: data.people || [] })
    } catch (e) {
      console.warn('Astros fetch error:', e)
    }
  }, [setAstronauts])

  const fetchISS = useCallback(async (showToast = false) => {
    try {
      setError(null)
      const data = await fetchWithFallback('http://api.open-notify.org/iss-now.json')
      const pos = {
        latitude: parseFloat(data.iss_position.latitude),
        longitude: parseFloat(data.iss_position.longitude),
        timestamp: data.timestamp,
      }

      // Calculate speed
      const now = Date.now()
      if (prevPosRef.current && prevTimeRef.current) {
        const elapsed = (now - prevTimeRef.current) / 1000
        const spd = calculateSpeed(prevPosRef.current, pos, elapsed)
        setSpeed(Math.round(spd))
      }
      prevPosRef.current = pos
      prevTimeRef.current = now

      setPosition(pos)
      setLoading(false)

      // Throttled reverse geocoding — only run if moved significantly
      clearTimeout(geocodeQueueRef.current)
      geocodeQueueRef.current = setTimeout(async () => {
        const locName = await reverseGeocode(pos.latitude, pos.longitude)
        setLocation(locName)
      }, 500)

      if (showToast) toast.success('ISS data refreshed')
    } catch (err) {
      setError('Failed to fetch ISS position. Retrying...')
      setLoading(false)
      if (showToast) toast.error('ISS refresh failed')
      console.error('ISS fetch error:', err)
    }
  }, [setPosition, setSpeed, setLocation, setLoading, setError])

  // Initial fetch
  useEffect(() => {
    setLoading(true)
    fetchISS()
    fetchAstronauts()
  }, [fetchISS, fetchAstronauts])

  // Poll every 15s
  useEffect(() => {
    const interval = setInterval(() => fetchISS(), POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchISS])

  const manualRefresh = useCallback(() => fetchISS(true), [fetchISS])

  return { manualRefresh, positionCount: history.length }
}
