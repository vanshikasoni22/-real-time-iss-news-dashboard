import { createContext, useContext, useState, useCallback } from 'react'

const ISSContext = createContext()

export function ISSProvider({ children }) {
  const [position, setPosition] = useState({ latitude: -18.9420, longitude: 70.8270 })
  const [history, setHistory] = useState([
    { latitude: -19.2, longitude: 70.1 },
    { latitude: -19.1, longitude: 70.4 },
    { latitude: -18.942, longitude: 70.827 }
  ])
  const [speedHistory, setSpeedHistory] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      time: new Date(Date.now() - (30 - i) * 15000).toLocaleTimeString(),
      speed: 24800 + Math.random() * 200
    }))
  )
  const [speed, setSpeed] = useState(24864.93)
  const [location, setLocation] = useState('Over ocean / remote area')
  const [astronauts, setAstronauts] = useState({
    number: 7,
    people: [
      { name: 'Oleg Kononenko', craft: 'ISS' },
      { name: 'Nikolai Chub', craft: 'ISS' },
      { name: 'Tracy Dyson', craft: 'ISS' },
      { name: 'Matthew Dominick', craft: 'ISS' },
      { name: 'Michael Barratt', craft: 'ISS' },
      { name: 'Jeanette Epps', craft: 'ISS' },
      { name: 'Alexander Grebenkin', craft: 'ISS' }
    ]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const updatePosition = useCallback((pos) => {
    setPosition(pos)
    setHistory(prev => {
      const next = [...prev, pos].slice(-15)
      return next
    })
    setLastUpdated(new Date())
  }, [])

  const updateSpeed = useCallback((spd) => {
    setSpeed(spd)
    setSpeedHistory(prev => {
      const entry = { time: new Date().toLocaleTimeString(), speed: spd }
      return [...prev, entry].slice(-30)
    })
  }, [])

  return (
    <ISSContext.Provider value={{
      position, setPosition: updatePosition,
      history,
      speed, setSpeed: updateSpeed,
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
