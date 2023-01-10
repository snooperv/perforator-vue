<template>
  <div class="block-container">
    <h2 class="block-title">Средняя оценка по всей команде</h2>
    <div class="inside-wrapper">
      <div v-for="(score, key) in user.team.generalRating">
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
      <div v-for="worker in user.team">
        <div class="items rating-name">
          <a href="#" class="name-link">
            <div class="peers-pic-raiting">
              <img class="avatar" src="@/assets/img/pic.png" alt="Аватар" />
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

export default {
  name: "MyTeam",

  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    this.loadScores();
  },

  methods: {
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

<style lang="scss" scoped>
.block-container {
  margin-top: 30px;
  width: 90%;
  background: #ffffff;
  border-radius: 30px;
  padding-bottom: 15px;
  margin-bottom: 50px;
}

.block-title {
  padding: 20px 15px 5px 35px;
}

.peers span {
  font-size: 22px;
  color: #222222;
}

.peers p {
  font-weight: 1000;
  text-align: left;
  font-size: 14px;
  margin-left: 30px;
  color: #414141;
}

input[type="submit"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.inside-wrapper {
  display: inline-block;
  margin-left: 45px;
  width: 95%;
}

.items {
  width: 80%;
  background-color: #f4f4fa;
  font-size: 20px;
  font-weight: 400;
  color: #333;
  border-radius: 20px;
  height: 60px;
  line-height: 60px;
  padding-left: 25px;
  margin-bottom: 5px;
  display: inline-block;
  float: left;
}

.sum {
  font-family: "Gotham Pro", sans-serif;
  font-weight: 1000;
  color: #4c4b9a;
}

.grade {
  display: inline-block;
  float: left;
  width: 100px;
  height: 60px;
  border-radius: 20px;
  background-color: #f4f4fa;
  margin-left: 5px;
}

.grade-number {
  font-size: 20px;
  color: #fff;
  padding: 5px;
  text-align: center;
  border-radius: 25px;
  width: 60px;
  height: 32px;
  line-height: 32px;
  display: inline-block;
  margin-left: 15px;
  margin-top: 9px;
}

.great {
  background-color: #a5a4f5;
}

.good {
  background-color: #edbd31;
}

.bad {
  background-color: #cd2525;
}

.rating-name {
  font-size: 22px;
}

.block-description {
  font-family: "Gotham Pro light", sans-serif;
  font-size: 15px;
  color: #2c286d;
  font-weight: 1000;
  margin: -20px 0 25px 35px;
}

.name-link {
  color: #2c286d;
  position: relative;
  left: -10px;
  text-decoration: none;
}

.peers-pic-raiting {
  width: 63px;
  height: 63px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  float: left;
  left: -30px;

  img {
    width: 100%;
  }
}
</style>
