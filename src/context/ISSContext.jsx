import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ISSContext = createContext()

// Pre-seeded history so the map trail renders immediately
const SEED_HISTORY = [
  { latitude: -19.80, longitude: 68.20 },
  { latitude: -19.60, longitude: 68.55 },
  { latitude: -19.40, longitude: 68.90 },
  { latitude: -19.20, longitude: 69.25 },
  { latitude: -19.00, longitude: 69.60 },
  { latitude: -18.80, longitude: 69.95 },
  { latitude: -18.94, longitude: 70.83 },
]

// Pre-seeded speed history so chart renders immediately
function seedSpeedHistory() {
  return Array.from({ length: 30 }, (_, i) => {
    const t = new Date(Date.now() - (30 - i) * 15000)
    return {
      time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      speed: 24750 + Math.round(Math.random() * 350),
    }
  })
}

export function ISSProvider({ children }) {
  const [position, _setPosition]       = useState({ latitude: -18.9420, longitude: 70.8270, timestamp: Date.now() / 1000 })
  const [history,  setHistory]         = useState(SEED_HISTORY)
  const [speedHistory, setSpeedHistory] = useState(seedSpeedHistory)
  const [speed,    setSpeedRaw]        = useState(24864)
  const [location, setLocation]        = useState('Over ocean / remote area')
  const [astronauts, setAstronauts]    = useState({
    number: 7,
    people: [
      { name: 'Oleg Kononenko',     craft: 'ISS' },
      { name: 'Nikolai Chub',       craft: 'ISS' },
      { name: 'Tracy C. Dyson',     craft: 'ISS' },
      { name: 'Matthew Dominick',   craft: 'ISS' },
      { name: 'Michael Barratt',    craft: 'ISS' },
      { name: 'Jeanette J. Epps',   craft: 'ISS' },
      { name: 'Alexander Grebenkin',craft: 'ISS' },
    ],
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const setPosition = useCallback((posOrUpdater) => {
    _setPosition(prev => {
      const next = typeof posOrUpdater === 'function' ? posOrUpdater(prev) : posOrUpdater
      setHistory(h => [...h, next].slice(-50))
      setLastUpdated(new Date())
      return next
    })
  }, [])

  const setSpeed = useCallback((spd) => {
    setSpeedRaw(spd)
    setSpeedHistory(prev => {
      const entry = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        speed: spd,
      }
      return [...prev, entry].slice(-30)
    })
  }, [])

  return (
    <ISSContext.Provider value={{
      position, setPosition,
      history,
      speed, setSpeed,
      speedHistory,
      location, setLocation,
      astronauts, setAstronauts,
      loading, setLoading,
      error, setError,
      lastUpdated,
    }}>
      {children}
    </ISSContext.Provider>
  )
}

export function useISS() {
  return useContext(ISSContext)
}
