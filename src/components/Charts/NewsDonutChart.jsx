import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useNews, CATEGORIES } from '../../context/NewsContext'

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = {
  technology: { bg: 'rgba(99,102,241,0.85)',  border: '#6366f1' },
  science:    { bg: 'rgba(16,185,129,0.85)',  border: '#10b981' },
}

export default function NewsDonutChart() {
  const { articles, setDonutFilter, donutFilter, setActiveCategory } = useNews()

  const counts = CATEGORIES.map(cat => articles[cat]?.length || 0)
  const total  = counts.reduce((a, b) => a + b, 0)

  const data = {
    labels: CATEGORIES.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [{
      data: counts,
      backgroundColor: CATEGORIES.map(c => COLORS[c]?.bg  || '#94a3b8'),
      borderColor:     CATEGORIES.map(c => COLORS[c]?.border || '#94a3b8'),
      borderWidth: 2,
      hoverOffset: 8,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          padding: 14,
          font: { size: 11, family: 'Inter' },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#94a3b8',
        bodyColor: '#f1f5f9',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: ctx => ` ${ctx.parsed} articles (${total ? Math.round(ctx.parsed / total * 100) : 0}%)`,
        },
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const idx = elements[0].index
        const cat = CATEGORIES[idx]
        if (donutFilter === cat) {
          setDonutFilter(null)
        } else {
          setDonutFilter(cat)
          setActiveCategory(cat)
        }
      }
    },
  }

  return (
    <div className="card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold text-slate-700">📊 News Distribution</h3>
        {donutFilter && (
          <button
            onClick={() => setDonutFilter(null)}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕ Clear
          </button>
        )}
      </div>
      <p className="text-[10px] text-slate-400 mb-2">Click a slice to filter articles</p>
      <div className="flex-1">
        {total === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            No data
          </div>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>
    </div>
  )
}
