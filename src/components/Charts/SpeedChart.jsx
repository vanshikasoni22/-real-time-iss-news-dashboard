import { useRef, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useISS } from '../../context/ISSContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function SpeedChart() {
  const { speedHistory } = useISS()

  const labels = speedHistory.map(s => s.time)
  const speeds = speedHistory.map(s => s.speed)

  const data = {
    labels,
    datasets: [{
      label: 'ISS Speed (km/h)',
      data: speeds,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.15)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#6366f1',
      tension: 0.4,
      fill: true,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#94a3b8',
        bodyColor: '#f1f5f9',
        borderColor: '#6366f1',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: ctx => `${ctx.parsed.y.toLocaleString()} km/h`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(148,163,184,0.1)' },
        ticks: { color: '#64748b', maxTicksLimit: 6, font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(148,163,184,0.1)' },
        ticks: {
          color: '#64748b',
          font: { size: 10 },
          callback: v => `${(v / 1000).toFixed(1)}k`,
        },
        suggestedMin: 20000,
        suggestedMax: 30000,
      },
    },
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="section-title flex items-center gap-2">
          ⚡ ISS Speed History
        </h3>
        <span className="text-xs text-slate-400 dark:text-slate-500">Last {speedHistory.length} readings</span>
      </div>
      <div style={{ height: 180 }}>
        {speedHistory.length < 2 ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Collecting speed data...
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  )
}
