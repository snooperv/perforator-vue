export const data = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
  datasets: [
    {
      label: "Средняя оценка",
      pointBackgroundColor: "#EDBD31",
      pointBorderColor: "#EDBD31",
      borderColor: "#A5A4F5",
      fill: true,
      backgroundColor: (ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 400);
        const opacity = 0.7;

        gradient.addColorStop(0.0501, `rgba(184, 184, 246, ${opacity})`);
        gradient.addColorStop(0.5498, `rgba(165, 164, 245, ${0.34 * opacity})`);
        gradient.addColorStop(0.995, `rgba(237, 189, 49, ${0.42 * opacity})`);
        gradient.addColorStop(1, `rgba(237, 189, 49, ${opacity})`);

        return gradient;
      },
      pointRadius: 8,
      pointHoverRadius: 12,
      data: [1.12, 2.25, 3.5, 2.1, 3.8],
      tension: 0.4,
      borderWidth: 5,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 4,
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  onClick: (e) => {
    console.log(e.chart.tooltip.title[0]);
  },
};
