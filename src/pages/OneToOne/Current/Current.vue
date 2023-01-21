<template>
  <div class="peers">
    <div class="date">
      <h2>Q2</h2>
      <span class="period"> 01.01.2023 - 14.01.2023</span>
    </div>

    <div v-for="worker in myTeam">
      <button
        @click="() => (worker.isDropdown = !worker.isDropdown)"
        class="peer dropbtn"
      >
        <span class="peers-pic">
          <img :src="API_URL() + worker.photo" class="avatar" alt="Аватар" />
        </span>
        <span class="name">{{ worker.username }}</span>

        <span class="position" v-if="isManager"> Мой руководитель</span>
        <a href="#" id="chev-1" class="chevron rotate">
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </a>
      </button>
      <DropdownForm
        v-if="worker.isDropdown"
        :my-id="user.myId"
        :worker-id="worker.profile_id"
      />
    </div>
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
    if (localStorage.getItem("isManager") === "true") {
      this.myTeam = this.user.team;
    } else {
      !this.user.manager && this.$store.dispatch("getMyManager");
      this.myTeam = this.user.manager;
    }
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    toggleForm() {
      this.isOpen = !this.isOpen;
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
  },
};
</script>

<style lang="scss" src="./current.scss" scoped></style>