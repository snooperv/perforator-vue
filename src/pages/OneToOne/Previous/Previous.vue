<template>
  <div class="peers" v-for="review in listReviews">
    <div class="date">
      <h2>Q{{ review.pr_id }}</h2>
      <span class="period">
        Дата окончания: {{ review.closing_date.split("T")[0] }}
      </span>
    </div>
    <div v-for="worker in myTeam">
      <button
        @click="
          worker.isDropdownObject[review.pr_id] =
            !worker.isDropdownObject[review.pr_id]
        "
        class="peer dropbtn"
        :class="{ opened: worker.isDropdownObject[review.pr_id] }"
      >
        <span class="peers-pic">
          <img :src="API_URL() + worker.photo" class="avatar" alt="Аватар" />
        </span>
        <span class="name">{{ worker.username }}</span>
        <span class="position" v-if="!isMobile && !user.statusManager">
          Мой руководитель</span
        >
        <a href="#" id="chev2" class="chevron rotate">
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </a>
      </button>
      <DropdownForm
        :open="worker.isDropdownObject[review.pr_id]"
        :my-id="user.myId"
        :worker-id="worker.profile_id"
        period="previous"
        :pr_id="review.pr_id"
      />
    </div>
  </div>
</template>

<script>
import DropdownForm from "@/components/OneToOne/DropdownForm";
import { mapState } from "vuex";
import { API_URL } from "@/helpers/api";

export default {
  name: "Previous",
  components: { DropdownForm },
  data() {
    return {
      myTeam: [],
    };
  },

  computed: {
    ...mapState(["isMobile", "listReviews", "user"]),
  },

  mounted() {
    this.listReviews.length === 0 &&
      this.$store.dispatch("getListPerformanceReview");
    this.user.statusManager !== undefined && this.getMyTeam();
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    toggleForm() {
      this.isOpen = !this.isOpen;
    },

    addPrIdUsers() {
      for (let user of this.myTeam) {
        if (user.isDropdownObject) continue;
        user.isDropdownObject = {};
      }

      this.listReviews.map((review) => {
        for (let user of this.myTeam) {
          if (user.isDropdownObject[review.pr_id]) continue;
          user.isDropdownObject[review.pr_id] = false;
        }
      });
    },

    getMyTeam() {
      if (this.user.statusManager) {
        if (this.user.team.length === 0) this.$store.dispatch("getMyTeam");
        this.myTeam = this.user.team;
      } else {
        !this.user.manager && this.$store.dispatch("getMyManager");
        this.myTeam = this.user.manager;
      }
      this.addPrIdUsers();
    },
  },

  watch: {
    "user.team": {
      handler() {
        this.myTeam = this.user.team;
        this.addPrIdUsers();
      },
    },

    "user.manager": {
      handler() {
        this.myTeam = this.user.manager;
        this.addPrIdUsers();
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

<style lang="scss" src="./previous.scss" scoped></style>
