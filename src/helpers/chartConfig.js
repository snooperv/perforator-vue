export const data = {
  labels: [],
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
      data: [3],
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
};
