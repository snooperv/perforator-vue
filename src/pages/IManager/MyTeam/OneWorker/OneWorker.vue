<template>
  <div class="self-review">
    <div class="form" v-if="worker?.username" id="head">
      {{ worker?.username }}
    </div>

    <div class="form">
      <div class="container">
        <h2 class="title">Итоговая обратная связь</h2>
        <table id="finalScore">
          <tbody>
            <tr>
              <td></td>
              <td class="table-heading">менеджер</td>
              <td class="table-heading">пиры</td>
              <td class="table-heading">средняя</td>
            </tr>
            <tr v-for="row in worker?.rating?.detailed">
              <td class="text-in-table">{{ row.name }}</td>
              <td class="numbers-in-table" v-for="rate in scores(row)">
                <div
                  class="grade-number"
                  :class="colorGrade(rate)"
                  id="average_avg_manager"
                >
                  {{ rate % 1 === 0 ? rate : rate.toFixed(1) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!------->
    <div class="form">
      <div class="container feedback-manager" :class="{ opened: fbIsDropdown }">
        <h2
          class="title"
          @click="fbIsDropdown = !fbIsDropdown"
          style="cursor: pointer"
        >
          Отзыв от менеджера
          <button class="peer dropbtn">
            <a href="" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
        </h2>

        <DropdownContent
          :peer-id="Number($route.params.id)"
          :prId="$route.params.prId"
          :open="fbIsDropdown && loaded"
        />
      </div>
    </div>
    <!--self review-->
    <div
      class="form"
      v-if="
        this.$route.path.includes('last-periods/employee') &&
        !user.statusManager
      "
    >
      <div class="container feedback-manager" :class="{ opened: srIsDropdown }">
        <h2
          class="title"
          @click="srIsDropdown = !srIsDropdown"
          style="cursor: pointer"
        >
          Результаты SelfReview
          <button class="peer dropbtn">
            <a href="" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
        </h2>
        <div class="drop" :class="{ show: srIsDropdown && loaded }">
          <SelfReviewContent :prId="$route.params.prId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorGrade from "@/helpers/colorGrade";
import { mapState } from "vuex";
import SelfReviewContent from "@/pages/SelfReview/SelfReviewContent.vue";
import { types } from "@/types";
import DropdownContent from "@/components/irate/DropdownContent.vue";
import _ from "lodash";

export default {
  name: "OneWorker",
  components: { DropdownContent, SelfReviewContent },

  data() {
    return {
      worker: {},
      loaded: false,
      srIsDropdown: false,
      fbIsDropdown: false,
    };
  },

  computed: {
    ...mapState(["user", "isMobile", "data", "prStatus"]),
  },

  async mounted() {
    if (this.user.team.length === 0 && this.user.statusManager)
      await this.$store.dispatch("getMyTeam");
    this.user.statusManager && (await this.loadScores());
    this.loadWorker();
  },

  methods: {
    colorGrade,

    async loadScores() {
      this.loaded = false;
      if (this.user.team.length === 0 && this.user.statusManager)
        await this.$store.dispatch("getMyTeam");
      if (this.user.team && this.user.statusManager) {
        this.user.team.map((user) => {
          this.$store.dispatch("getUserScores", user);
        });
      }
      this.loadWorker();
    },

    loadWorker() {
      if (this.user.statusManager) {
        this.worker = this.user.team.filter(
          (oneUser) => oneUser.profile_id === +this.$route.params.id
        )[0];
      } else this.worker = this.user.team;
      this.loaded = true;
    },

    scores(data) {
      const newData = _.clone(data);
      delete newData.name;
      return newData;
    },
  },

  watch: {
    "user.team": {
      handler() {
        if (this.loaded) this.loadScores();
      },
    },

    "user.statusManager": {
      handler() {
        if (this.loaded) this.loadScores();
      },
    },

    prStatus: {
      handler() {
        this.loadScores();
      },
    },

    "data.previousPeriod": {
      handler() {
        this.loadWorker();
      },
    },

    "$route.params.prId": {
      handler() {
        this.srIsDropdown = false;
        this.fbIsDropdown = false;
      },
    },
  },

  beforeUnmount() {
    this.srIsDropdown = false;
    this.$store.commit(types.CLEAR_SELF_REVIEW);
  },
};
</script>

<style lang="scss" src="./oneWorker.scss" scoped></style>
