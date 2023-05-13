<template>
  <div
    class="peers"
    v-if="prStatus?.status !== 'no pr' && prStatus?.pr_status > 3"
  >
    <div class="date">
      <h2>Текущий цикл Performance-Review</h2>
    </div>

    <div v-for="worker in myTeam">
      <button
        @click="worker.isDropdown = !worker.isDropdown"
        class="peer dropbtn"
        :class="{ opened: worker.isDropdown }"
      >
        <span class="peers-pic">
          <img :src="API_URL() + worker.photo" class="avatar" alt="Аватар" />
        </span>
        <span class="name">{{ worker.username }}</span>
        <span class="position" v-if="!isMobile && !user.statusManager">
          Мой руководитель</span
        >
        <span class="position" v-if="!isMobile && isManager">
          Мой руководитель</span
        >
        <a href="#" id="chev-1" class="chevron rotate">
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </a>
      </button>
      <DropdownForm
        :open="worker.isDropdown"
        :my-id="user.myId"
        :worker-id="worker.profile_id"
        period="current"
      />
    </div>
  </div>

  <div class="stage-closed" v-else>
    <h3>Данный этап сейчас закрыт</h3>
    <p>
      Вы сможете оставить комментарий после того как менеджер запустит этап "One
      to One"
    </p>
  </div>
</template>

<script>
import DropdownForm from "@/components/OneToOne/DropdownForm";
import { mapState } from "vuex";
import { API_URL } from "@/helpers/api";

export default {
  name: "Current",
  components: { DropdownForm },

  data() {
    return {
      myTeam: [],
      isManager: localStorage.getItem("isManager") !== "true",
    };
  },

  mounted() {
    this.user.statusManager !== undefined && this.getMyTeam();
  },

  computed: {
    ...mapState(["user", "prStatus", "isMobile"]),
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    toggleForm() {
      this.isOpen = !this.isOpen;
    },
    getMyTeam() {
      if (this.user.statusManager) {
        if (this.user.team.length === 0) this.$store.dispatch("getMyTeam");
        this.myTeam = this.user.team;
      } else {
        !this.user.manager && this.$store.dispatch("getMyManager");
        this.myTeam = this.user.manager;
      }
    },
  },

  watch: {
    "user.team": {
      handler() {
        this.myTeam = this.user.team;
      },
    },

    "user.manager": {
      handler() {
        this.myTeam = this.user.manager;
      },
    },

    "user.statusManager": {
      handler() {
        this.getMyTeam();
      },
    },
  },
};
</script>

<style lang="scss" src="./current.scss" scoped></style>
