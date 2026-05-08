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
  const safeHistory = speedHistory || []

  const data = {
    labels: safeHistory.map(s => s?.time || ''),
    datasets: [{
      label: 'ISS Speed (km/h)',
      data: safeHistory.map(s => s?.speed || 0),
      borderColor: '#e11d48',
      backgroundColor: 'rgba(225, 29, 72, 0.06)',
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: 0.4,
      fill: true,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { size: 10, family: 'Inter' },
          boxWidth: 12,
          padding: 8,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#94a3b8',
        bodyColor: '#f1f5f9',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 8,
        callbacks: {
          label: ctx => ` ${ctx.parsed.y.toLocaleString()} km/h`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          font: { size: 7, family: 'Inter' },
          color: '#94a3b8',
          maxTicksLimit: 8,
          maxRotation: 45,
        },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
      y: {
        display: true,
        ticks: {
          font: { size: 7, family: 'Inter' },
          color: '#94a3b8',
          callback: v => v.toLocaleString(),
        },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
    },
  }

  return (
    <div className="card p-4 h-full bg-white">
      <Line data={data} options={options} />
    </div>
  )
}
