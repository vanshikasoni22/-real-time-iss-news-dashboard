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
      label: 'Speed',
      data: safeHistory.map(s => s?.speed || 0),
      borderColor: '#e11d48',
      backgroundColor: 'rgba(225, 29, 72, 0.05)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.4,
      fill: true,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: true, ticks: { font: { size: 7 } } },
      y: { display: true, ticks: { font: { size: 7 } } }
    },
  }

  return (
    <div className="card p-4 h-full bg-white">
      <Line data={data} options={options} />
    </div>
  )
}
