import { createContext, useContext, useState, useCallback } from 'react'

const ISSContext = createContext()

export function ISSProvider({ children }) {
  const [position, setPosition] = useState(null)
  const [history, setHistory] = useState([])       // last 15 positions
  const [speedHistory, setSpeedHistory] = useState([]) // last 30 {time,speed}
  const [speed, setSpeed] = useState(0)
  const [location, setLocation] = useState('Fetching...')
  const [astronauts, setAstronauts] = useState({ number: 0, people: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

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
