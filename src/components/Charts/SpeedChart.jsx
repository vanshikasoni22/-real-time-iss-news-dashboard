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

  const data = {
    labels: speedHistory.map(s => s.time),
    datasets: [{
      label: 'ISS Speed (km/h)',
      data: speedHistory.map(s => s.speed),
      borderColor: '#e11d48', // Red line
      backgroundColor: 'rgba(225, 29, 72, 0.05)',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.3,
      fill: true,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: true, ticks: { display: true, maxRotation: 45, minRotation: 45, font: { size: 8 } } },
      y: { display: true, suggestedMin: 24500, suggestedMax: 25100, ticks: { font: { size: 8 } } }
    },
  }

  return (
    <div className="card p-4 h-full">
      <Line data={data} options={options} />
    </div>
  )
}
