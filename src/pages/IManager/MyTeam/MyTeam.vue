<template>
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
          <button
            class="exit"
            @click="deleteUser(worker.profile_id)"
            v-if="!isMobile"
          >
            Удалить
          </button>
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

  <div class="block-container">
    <h2 class="block-title">Выбор сотрудников в мою команду</h2>
    <p class="block-description">
      *здесь вы можете выбрать сотрудников, которые работают в вашей команде
    </p>
    <button class="add-peer" @click="openAllUsers">Добавить сотрудников</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import colorGrade from "@/helpers/colorGrade";
import { API_URL } from "@/helpers/api";
import { openModal } from "jenesius-vue-modal";
import PeersList from "@/components/modals/PeersList/PeersList.vue";
import PeersListMobile from "@/components/modals/PeersList/peersListMobile.vue";

export default {
  name: "MyTeam",

  data() {
    return {
      targetScore: {},
    };
  },

  computed: {
    ...mapState(["user", "isMobile", "data"]),
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
      this.$router.push({ name: "employee", params: { id } });
    },

    loadScores() {
      if (this.user.team && !this.data.previousPeriod) {
        this.$store.dispatch("getTeamScores", {
          team: this.user.team,
        });
      }
    },

    openAllUsers() {
      if (!this.isMobile)
        openModal(PeersList, { isManager: true, isAllUsers: true });
      else openModal(PeersListMobile, { isManager: true, isAllUsers: true });
    },

    deleteUser(id) {
      this.$store.dispatch("deleteUserImMyTeam", id);
    },
  },

  watch: {
    "user.statusManager": {
      handler() {
        this.loadScores();
      },
    },
  },
};
</script>

<style lang="scss" src="./myTeam.scss" scoped></style>
