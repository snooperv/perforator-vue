<template>
  <div
    class="block-container"
    v-if="prStatus?.status !== 'no pr' && prStatus?.pr_status > 1"
  >
    <h2 class="block-title">
      Неутвержденные пользователи
      <span class="peers-amount" id="not_approve_users_count">{{
        user.teamWithReview.length
      }}</span>
    </h2>

    <div id="team_not_approve">
      <div class="peers" v-for="worker in user.teamWithReview">
        <button
          @click="() => (worker.isDropdown = !worker.isDropdown)"
          class="peer dropbtn"
        >
          <span class="peers-pic-manager">
            <img class="avatar" :src="API_URL() + worker.photo" alt="Аватар" />
          </span>
          <span class="name" style="margin-left: 0">{{ worker.username }}</span>
          <a href="#" class="chevron" id="remove_ref3">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </a>
        </button>
        <DropdownPeers v-if="worker.isDropdown" :id="worker.profile_id" />
      </div>
    </div>
  </div>

  <div
    class="block-container"
    v-if="prStatus?.status !== 'no pr' && prStatus?.pr_status > 1"
  >
    <h2 class="block-title">
      Пользователь не отправил Self Review
      <span class="peers-amount" id="without_sr_users_count">{{
        user.teamWithoutReview.length
      }}</span>
    </h2>
    <div id="team_without_self_review">
      <div class="peers" v-for="worker in user.teamWithoutReview">
        <button id="remove_btn4" class="peer dropbtn" style="cursor: default">
          <span class="peers-pic-manager">
            <img class="avatar" :src="API_URL() + worker.photo" alt="Аватар" />
          </span>
          <span class="name" style="margin-left: 0">{{ worker.username }}</span>
        </button>
      </div>
    </div>
  </div>

  <div
    class="block-container"
    v-if="prStatus?.status !== 'no pr' && prStatus?.pr_status > 1"
  >
    <h2 class="block-title">
      Утверждённые пользователи
      <span class="peers-amount last" id="approve_users_count">{{
        user.teamApprove.length
      }}</span>
    </h2>
    <div id="team_approve">
      <div class="peers" v-for="worker in user.teamApprove">
        <button id="remove_btn4" class="peer dropbtn" style="cursor: default">
          <span class="peers-pic-manager">
            <img class="avatar" :src="API_URL() + worker.photo" alt="Аватар" />
          </span>
          <span class="name" style="margin-left: 0">{{ worker.username }}</span>
        </button>
      </div>
    </div>
  </div>

  <div class="stage-closed" v-else>
    <h3>Данный этап сейчас закрыт</h3>
    <p>
      Вы сможете утвердить выбранный пиров сотрудников после того как перейдете
      к этапу "Утверждение пиров"
    </p>
  </div>
</template>

<script>
import DropdownPeers from "@/components/imanager/DropdownPeers";
import { mapState } from "vuex";
import { API_URL } from "@/helpers/api";

export default {
  name: "PeerApproval",
  components: { DropdownPeers },

  mounted() {
    this.getListApproval();
  },

  computed: {
    ...mapState(["user", "prStatus"]),
  },

  methods: {
    API_URL() {
      return API_URL;
    },

    getListApproval() {
      if (
        this.prStatus?.status !== "no pr" &&
        this.prStatus?.pr_status > 1 &&
        this.user.teamWithReview.length === 0 &&
        this.user.teamWithoutReview.length === 0 &&
        this.user.teamApprove.length === 0
      )
        this.$store.dispatch("getIsApproval");
    },
  },

  watch: {
    prStatus: {
      handler() {
        this.getListApproval();
      },
    },
  },
};
</script>

<style lang="scss" src="./peerApproval.scss" scoped></style>
