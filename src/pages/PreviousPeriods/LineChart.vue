<template>
  <Line :data="data" :options="options" class="line-chart" v-if="loaded" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  // Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";
import { data, options } from "@/helpers/chartConfig";
import { mapState } from "vuex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  // Legend
  Filler
);
ChartJS.defaults.font.size = 18;
ChartJS.defaults.font.weight = 700;
ChartJS.defaults.color = "#2C286D";

export default {
  name: "LineChart",
  components: {
    Line,
  },
  data() {
    return { data, options, loaded: false, scores: [] };
  },

  async mounted() {
    this.loaded = false;

    try {
      this.listReviews.length === 0 &&
        (await this.$store.dispatch("getListPerformanceReview"));
      data.labels = this.listReviews.map(
        (review) => review.closing_date.split("T")[0]
      );

      if (this.user.statusManager) {
        if (this.user.team.length === 0)
          await this.$store.dispatch("getMyTeam");
        if (data.datasets[0].data.length === 0) {
          for (let review of this.listReviews) {
            await this.loadScores(review.pr_id);
            const resultTeam = { ...this.user.team };
            this.scores.push({ period: review.pr_id, results: resultTeam });
            data.datasets[0].data.push(
              resultTeam.generalRating["Средняя оценка"]
            );
          }
        }
      }

      options.onClick = (e) => {
        console.log(e.chart.tooltip.title[0]);
      };

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },

  computed: {
    ...mapState(["listReviews", "user"]),
  },

  methods: {
    async loadScores(period) {
      if (this.user.team) {
        await this.$store.dispatch("getTeamScores", {
          team: this.user.team,
          period,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  background: #f4f4fa;
  border-radius: 43px;
  padding: 30px 35px;
}

@media (max-width: 800px) {
  .line-chart {
    padding: 15px;
  }
}
</style>
