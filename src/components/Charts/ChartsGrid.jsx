import ISSSpeedChart from './ISSSpeedChart.jsx';
import NewsDoughnutChart from './NewsDoughnutChart.jsx';

export default function ChartsGrid({ issData, newsData }) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <ISSSpeedChart readings={issData.speedReadings} />
      <NewsDoughnutChart
        articlesByCategory={newsData.articlesByCategory}
        activeCategory={newsData.activeCategory}
        setActiveCategory={newsData.setActiveCategory}
      />
    </section>
  );
}
