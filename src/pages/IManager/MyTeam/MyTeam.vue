<template>
  <div class="block-container">
    <h2 class="block-title">Средняя оценка по всей команде</h2>
    <div class="inside-wrapper">
      <div class="grades" v-for="(score, key) in user.team.generalRating">
        <div class="items" :class="key === 'Средняя оценка' && 'sum'">
          {{ key }}
        </div>
        <div class="grade">
          <div class="grade-number" :class="colorGrade(score)">{{ score }}</div>
        </div>
      </div>
      <!--<div class="items sum">
          Нормированная оценка
      </div>
      <div class="grade">
          <div class="grade-number great">3.8</div>
      </div>-->
    </div>
  </div>

  <div class="block-container">
    <h2 class="block-title">Рейтинг сотрудников</h2>
    <p class="block-description">
      *кликните на сотрудника, чтобы посмотреть результаты его ревью
    </p>
    <div class="inside-wrapper rating" style="width: 95%">
      <div class="grades" v-for="worker in user.team">
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
              :class="colorGrade(worker.rating?.averages.average)"
            >
              {{ worker.rating?.averages.average }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import colorGrade from "@/helpers/colorGrade";
import { API_URL } from "@/helpers/api";

export default {
  name: "MyTeam",

  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    this.loadScores();
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    colorGrade,
    toEmployee(e, id) {
      e.preventDefault();
      this.$router.push({ name: "employee", params: { id } });
    },

    loadScores() {
      console.log(this.user.team);
      if (this.user.team) {
        this.$store.dispatch("getTeamScores", this.user.team);
      }
    },
  },

  watch: {
    "user.team": {
      handler() {
        this.loadScores();
      },
    },
  },
};
</script>

<style lang="scss" src="./myTeam.scss" scoped></style>
