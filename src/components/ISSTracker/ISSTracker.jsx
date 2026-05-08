import { RefreshCcw } from 'lucide-react';
import { formatCoordinate, formatSpeed } from '../../utils/formatters';
import CopyButton from '../UI/CopyButton.jsx';
import { Skeleton } from '../UI/Loader.jsx';
import MetricCard from '../UI/MetricCard.jsx';
import AstronautList from './AstronautList.jsx';
import ISSMap from './ISSMap.jsx';

export default function ISSTracker({ issData }) {
  const { current, positions, location, astronauts, loading, error, refreshPosition, refreshAstronauts } = issData;

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,.55fr)]">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">Live orbit</p>
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">ISS Live Tracking</h1>
          </div>
          <button
            type="button"
            onClick={() => refreshPosition()}
            className="inline-flex items-center gap-2 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
        {loading && !current ? <Skeleton className="h-[360px] lg:h-[460px]" /> : <ISSMap positions={positions} current={current} />}
        {error ? (
          <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
            {error}
            <button type="button" onClick={() => refreshPosition()} className="ml-3 font-semibold underline">
              Retry
            </button>
          </div>
        ) : null}
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <MetricCard label="Latitude" value={current ? formatCoordinate(current.lat) : '--'} tone="teal" />
          <MetricCard label="Longitude" value={current ? formatCoordinate(current.lon) : '--'} />
          <MetricCard label="Speed" value={`${formatSpeed(current?.speed || 0)} km/h`} detail="Haversine estimate" />
          <MetricCard label="Positions tracked" value={positions.length} detail="Last 15 shown on map" />
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Nearest location</p>
              <p className="mt-2 text-base font-medium text-slate-900 dark:text-white">{location}</p>
            </div>
            {current ? <CopyButton label="Coordinates" value={`${current.lat}, ${current.lon}`} /> : null}
          </div>
        </div>
        <AstronautList astronauts={astronauts} onRefresh={refreshAstronauts} />
      </div>
    </section>
  );
}
