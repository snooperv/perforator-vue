<template>
  <div
    v-if="
      this.$route.path.includes('last-periods/team') ||
      (prStatus?.status !== 'no pr' && prStatus?.pr_status > 3)
    "
  >
    <div class="block-container">
      <h2 class="block-title">Средняя оценка по всей команде</h2>
      <div class="inside-wrapper">
        <div
          class="grades"
          v-for="(score, key) in data.previousPeriod?.average ||
          user.team.generalRating"
        >
          <div class="items" :class="key === 'Средняя оценка' && 'sum'">
            {{ key }}
          </div>
          <div class="grade">
            <div class="grade-number" :class="colorGrade(score)">
              {{ score }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-container">
      <h2 class="block-title">Рейтинг сотрудников</h2>
      <p class="block-description">
        *кликните на сотрудника, чтобы посмотреть результаты его ревью
      </p>
      <div class="inside-wrapper rating" style="width: 95%">
        <div
          class="grades"
          v-for="worker in data.previousPeriod?.results || user.team"
        >
          <div class="items rating-name">
            <a href="#" class="name-link">
              <div class="peers-pic-raiting">
                <img
                  class="avatar"
                  :src="API_URL() + worker.photo"
                  alt="Аватар"
                />
              </div>
            </a>
            <a
              href=""
              @click="(e) => toEmployee(e, worker.profile_id)"
              class="name-link"
              >{{ worker.username }}
            </a>
          </div>
          <a href="#">
            <div class="grade">
              <div
                class="grade-number"
                :class="colorGrade(worker.rating?.average)"
              >
                {{ worker.rating?.average }}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="stage-closed" v-else>
    <h3>Данный этап сейчас закрыт</h3>
    <p>
      Вы сможете посмотреть результаты команды после того как перейдете к этапу
      "One to One"
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import colorGrade from "@/helpers/colorGrade";
import { API_URL } from "@/helpers/api";

export default {
  name: "MyTeam",

  data() {
    return {
      targetScore: {},
    };
  },

  computed: {
    ...mapState(["user", "isMobile", "data", "prStatus"]),
  },

  async mounted() {
    if (this.user.team.length === 0) await this.$store.dispatch("getMyTeam");
    this.user.statusManager && this.loadScores();
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    colorGrade,
    toEmployee(e, id) {
      e.preventDefault();
      if (this.data.previousPeriod?.results)
        this.$router.push({
          name: "employeePeriods",
          params: { id, prId: this.$route.params.prId },
        });
      else this.$router.push({ name: "employee", params: { id } });
    },

    loadScores() {
      if (
        this.user.team &&
        !this.data.previousPeriod &&
        this.prStatus?.status !== "no pr" &&
        this.prStatus?.pr_status > 3 &&
        this.user.statusManager
      ) {
        this.$store.dispatch("getTeamScores", {
          team: this.user.team,
          period: this.prStatus.pr_id,
        });
      }
    },
  },

  watch: {
    "user.statusManager": {
      handler() {
        this.loadScores();
      },
    },

    prStatus: {
      handler() {
        this.loadScores();
      },
    },
  },
};
</script>

<style lang="scss" src="./myTeam.scss" scoped></style>
