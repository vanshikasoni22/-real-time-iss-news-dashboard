import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatTime } from '../../utils/formatters';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ISSSpeedChart({ readings }) {
  const labels = readings.map((reading) => formatTime(reading.readAt));
  const speeds = readings.map((reading) => Math.round(reading.speed || 0));

  const data = {
    labels,
    datasets: [
      {
        label: 'ISS speed km/h',
        data: speeds,
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.14)',
        pointRadius: 3,
        tension: 0.35,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { ticks: { maxTicksLimit: 6 } },
      y: { beginAtZero: true, title: { display: true, text: 'km/h' } }
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">ISS Speed</h2>
      <div className="mt-4 h-72">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
