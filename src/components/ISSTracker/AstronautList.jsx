import { UsersRound } from 'lucide-react';
import { Spinner } from '../UI/Loader.jsx';

export default function AstronautList({ astronauts, onRefresh }) {
  const people = astronauts?.people || [];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UsersRound className="text-teal-500" size={19} />
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">People in Space</h2>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>
      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{astronauts?.number || 0}</p>
      {people.length ? (
        <ul className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          {people.map((person) => (
            <li key={`${person.name}-${person.craft}`} className="rounded-md bg-slate-100 px-3 py-2 dark:bg-slate-800">
              {person.name}
              <span className="ml-2 text-xs text-slate-400">{person.craft}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <Spinner label="Loading astronauts" />
        </div>
      )}
    </section>
  );
}
