<template>
  <Line :data="data" :options="options" class="line-chart" v-if="loaded" />
</template>

<script>
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "vue-chartjs";
import { data, options } from "@/helpers/chartConfig";
import { mapState } from "vuex";
import _ from "lodash";

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
    return { data, options, loaded: false };
  },

  mounted() {
    this.getScores();
  },

  computed: {
    ...mapState(["listReviews", "user", "scores", "prStatus"]),
  },

  methods: {
    async loadScores(period) {
      if (this.user.statusManager) {
        await this.$store.dispatch("getTeamScores", period);
      } else if (this.user.myId) {
        const user = _.cloneDeep(this.user);
        await this.setScores(period, user);
      }
    },

    async setScores(id, user) {
      const date = this.listReviews.filter((review) => review.pr_id === id)[0]
        .closing_date;
      const team = _.cloneDeep(this.user.team);
      if (this.user.statusManager) {
        await Promise.all(
          team.map(async (user) => {
            user.pr_id = await this.$store.dispatch("getPreviousPeriods", {
              id: user.user_id,
              date,
            });
            await this.$store.dispatch("getUserScores", user);
          })
        );
      } else if (user?.myId) {
        user.pr_id = await this.$store.dispatch("getPreviousPeriods", {
          id: user.myId,
          date,
        });
        await this.$store.dispatch("getUserScores", user);
      }
    },

    async getScores() {
      this.loaded = false;

      try {
        this.listReviews.length === 0 &&
          (await this.$store.dispatch("getListPerformanceReview"));
        const actualReviews = _.cloneDeep(this.listReviews);
        this.prStatus?.status !== "no pr" && actualReviews.pop();
        data.labels = actualReviews.map(
          (review) => review.closing_date.split("T")[0]
        );

        if (this.user.statusManager && this.user.team.length === 0) {
          await this.$store.dispatch("getMyTeam");
        }
        if (data.datasets[0].data.length === 0) {
          for (let review of actualReviews) {
            await this.loadScores(review.pr_id, false);
            const averageTeam = _.cloneDeep(this.user.team.generalRating);
            if (averageTeam || this.user.team.rating) {
              const average = averageTeam
                ? averageTeam["Средняя оценка"]
                : this.user.team.rating.average;
              data.datasets[0].data.push(average);
            }
            if (+this.$route.params.prId === review.pr_id) {
              await this.setScores(review.pr_id);
            }
          }
        }

        options.onClick = (e) => {
          const indexClick = e.chart.getElementsAtEventForMode(
            e,
            "nearest",
            { intersect: true },
            true
          )[0]?.index;

          if (indexClick !== undefined) {
            const period = actualReviews[indexClick].pr_id;

            this.setScores(period);

            const targetScore = this.scores.filter(
              (score) => score.period === period
            );

            if (targetScore) {
              if (this.user.statusManager) {
                this.$router.push({
                  name: "teamPeriods",
                  params: { prId: period },
                });
              } else {
                this.$router.push({
                  name: "employeePeriods",
                  params: { id: this.user.myId, prId: period },
                });
              }
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
      deep: true,
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
