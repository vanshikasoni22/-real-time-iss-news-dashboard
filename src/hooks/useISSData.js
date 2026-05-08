import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchAstronauts, fetchISSPosition, reverseGeocode } from '../services/api';
import { calculateSpeed } from '../utils/haversine';
import { useInterval } from './useInterval';

export function useISSData(notify) {
  const [positions, setPositions] = useState([]);
  const [speedReadings, setSpeedReadings] = useState([]);
  const [location, setLocation] = useState('Locating...');
  const [astronauts, setAstronauts] = useState({ number: 0, people: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshPosition = useCallback(
    async ({ silent = false } = {}) => {
      try {
        setError('');
        const next = await fetchISSPosition();

        setPositions((current) => {
          const previous = current.at(-1);
          const speed = previous ? calculateSpeed(previous, next) : 0;
          const enriched = { ...next, speed, readAt: new Date(next.timestamp * 1000).toISOString() };

          setSpeedReadings((readings) => [...readings, enriched].slice(-30));
          return [...current, enriched].slice(-15);
        });

        reverseGeocode(next.lat, next.lon)
          .then(setLocation)
          .catch(() => setLocation('Over open ocean or remote region'));

        if (!silent) notify?.('ISS position refreshed', 'success');
      } catch (caught) {
        const message = caught.message || 'Unable to refresh ISS data.';
        setError(message);
        notify?.(message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  const refreshAstronauts = useCallback(async () => {
    try {
      const data = await fetchAstronauts();
      setAstronauts(data);
    } catch (caught) {
      notify?.(caught.message || 'Unable to load astronauts.', 'error');
    }
  }, [notify]);

  useEffect(() => {
    refreshPosition({ silent: true });
    refreshAstronauts();
  }, [refreshAstronauts, refreshPosition]);

  useInterval(() => refreshPosition({ silent: true }), 15000);

  const current = positions.at(-1) || null;

  return useMemo(
    () => ({
      current,
      positions,
      speedReadings,
      location,
      astronauts,
      loading,
      error,
      refreshPosition,
      refreshAstronauts
    }),
    [astronauts, current, error, loading, location, positions, refreshAstronauts, refreshPosition, speedReadings]
  );
}
