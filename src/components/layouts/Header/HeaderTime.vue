<template>
  <div class="popup-mobile timer-mobile" v-if="isMobile">
    <h3>До завершения Self-Review</h3>

    <div class="timer">
      <div class="block-time">
        <span id="days" class="time">10</span>
        <span class="under">дней</span>
      </div>
      <span class="colon">:</span>
      <div class="block-time">
        <span id="hours" class="time">14</span>
        <span class="under">часов</span>
      </div>
      <span class="colon">:</span>
      <div class="block-time">
        <span id="minutes" class="time">25</span>
        <span class="under">минут</span>
      </div>
    </div>

    <div class="draggable-block" @mousedown="dragStart" @touchstart="dragStart">
      <div class="draggable-line"></div>
    </div>
  </div>
</template>

<script>
import { closeModal } from "jenesius-vue-modal";
import { mapState } from "vuex";
import { dragStart } from "@/helpers/dragMethods";

export default {
  name: "UserInfo",

  computed: {
    ...mapState(["isMobile"]),

    closeUserInfo() {
      closeModal();
    },
  },

  methods: {
    dragStart,
    userLogout() {
      this.$store.commit("CLEAR_lOCALSTORGE");
      window.location = "/login";
    },
  },
};
</script>

<style lang="scss" src="../../modals/UserInfo/userInfo.scss" scoped></style>
