import { useEffect, useRef, useCallback } from 'react'
import { useISS } from '../context/ISSContext'
import { calculateSpeed } from '../utils/haversine'
import { reverseGeocode } from '../utils/geocoding'
import toast from 'react-hot-toast'

const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544'
const ASTROS_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('http://api.open-notify.org/astros.json')

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
      const res = await fetch(ASTROS_URL)
      const data = await res.json()
      setAstronauts({ number: data.number, people: data.people || [] })
    } catch (e) {
      console.warn('Astros fetch error:', e)
    }
  }, [setAstronauts])

  const fetchISS = useCallback(async (showToast = false) => {
    try {
      setError(null)
      const res = await fetch(ISS_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      
      const pos = {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        timestamp: data.timestamp,
      }

      // The API provides velocity in mph/kph directly!
      setSpeed(Math.round(data.velocity))
      
      setPosition(pos)
      setLoading(false)

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
