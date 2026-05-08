import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NewsDoughnutChart({ articlesByCategory, activeCategory, setActiveCategory }) {
  const labels = Object.keys(articlesByCategory);
  const counts = labels.map((label) => articlesByCategory[label].length);

  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: ['#14b8a6', '#f59e0b'],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    onClick: (_event, elements) => {
      if (!elements.length) {
        setActiveCategory('All');
        return;
      }
      const category = labels[elements[0].index];
      setActiveCategory(activeCategory === category ? 'All' : category);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">News Distribution</h2>
        {activeCategory !== 'All' ? (
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="mt-4 h-72">
        <Doughnut data={data} options={options} />
      </div>
    </section>
  );
}
