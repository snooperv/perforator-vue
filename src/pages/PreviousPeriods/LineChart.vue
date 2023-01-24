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
import { types } from "@/types";

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

  mounted() {
    if (this.user.statusManager) this.getScores();
  },

  computed: {
    ...mapState(["listReviews", "user"]),
  },

  methods: {
    async loadScores(period) {
      if (this.user.team) {
        console.log(this.user.statusManager);
        await this.$store.dispatch("getTeamScores", {
          team: this.user.statusManager ? this.user.team : [this.user],
          period,
        });
      }
    },

    async getScores() {
      this.loaded = false;

      try {
        this.listReviews.length === 0 &&
          (await this.$store.dispatch("getListPerformanceReview"));
        data.labels = this.listReviews.map(
          (review) => review.closing_date.split("T")[0]
        );

        if (this.user.statusManager && this.user.team.length === 0) {
          await this.$store.dispatch("getMyTeam");
        }

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

        console.log(this.scores); // TODO Убрать потом

        options.onClick = (e) => {
          console.log(this.scores);
          const dataPoints = e.chart.tooltip.dataPoints;
          if (dataPoints) {
            const period = this.listReviews.filter(
              (review) =>
                review.closing_date.split("T")[0] === dataPoints[0].label
            )[0].pr_id;
            console.log(period);

            const targetScore = this.scores.filter(
              (score) => score.period === period
            );

            this.$store.commit(types.SET_SCORE_BEFORE_UNMOUNT, {
              previousPeriod: targetScore && targetScore[0].results,
            });

            if (this.user.statusManager && targetScore) {
              this.$router.push("/last-periods/team");
            }
          }
        };

        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },

  watch: {
    "user.statusManager": {
      handler() {
        this.getScores();
      },
    },
  },

  // beforeDestroy() {
  //   this.$store.commit(types.SET_SCORE_BEFORE_UNMOUNT, {
  //     lastPeriod: this.score,
  //   });
  // },
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
