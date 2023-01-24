<template>
  <div class="popup-mobile timer-mobile" v-if="isMobile">
    <h3
      v-if="prStatus && prStatus.status !== 'no pr' && prStatus.pr_status !== 0"
    >
      До завершения {{ getStage() }}
    </h3>

    <div
      class="timer"
      v-if="prStatus && prStatus.status !== 'no pr' && prStatus.pr_status !== 0"
    >
      <div class="block-time">
        <span id="days" class="time">{{ getDays() }}</span>
        <span class="under">дней</span>
      </div>
      <span class="colon">:</span>
      <div class="block-time">
        <span id="hours" class="time">{{ getHours() }}</span>
        <span class="under">часов</span>
      </div>
      <span class="colon">:</span>
      <div class="block-time">
        <span id="minutes" class="time">{{ getMinutes() }}</span>
        <span class="under">минут</span>
      </div>
    </div>

    <div
      class="timer"
      v-if="
        prStatus && (prStatus.status === 'no pr' || prStatus.pr_status === 0)
      "
    >
      <span class="untill" v-if="prStatus.status === 'no pr'">{{
        prStatus.pr_status
      }}</span>
      <span class="untill" v-if="prStatus.pr_status === 0"
        >Performance Review не начато</span
      >
    </div>

    <div class="draggable-block" @mousedown="dragStart" @touchstart="dragStart">
      <div class="draggable-line"></div>
    </div>
  </div>
</template>

<script>
import { closeModal } from "jenesius-vue-modal";
import { mapState } from "vuex";
import { dragStart } from "@/helpers/dragMethodsTop";

export default {
  name: "UserInfo",

  computed: {
    ...mapState(["isMobile", "prStatus"]),

    closeUserInfo() {
      closeModal();
    },

    getStage() {
      switch (this.prStatus.pr_status) {
        case 1:
          return '"Self-Review"';
        case 2:
          return '"Утверждение пиров"';
        case 3:
          return '"Взаимное оценивание"';
        case 4:
          return '"One to One"';
      }
    },

    getDays() {
      return this.parseDate().offsetDays;
    },

    getHours() {
      return this.parseDate().offsetHours;
    },

    getMinutes() {
      return this.parseDate().offsetMinutes;
    },
  },

  methods: {
    parseDate() {
      const dateNow = new Date();
      const deadline = new Date(this.prStatus.deadline);
      const offset = deadline - dateNow;
      let offsetMinutes = Math.ceil((offset / 1000 / 60) % 60);
      let offsetHours = Math.floor((offset / 1000 / 60 / 60) % 24);
      let offsetDays = Math.floor(offset / 1000 / 60 / 60 / 24);
      if (offsetMinutes === 60) {
        offsetMinutes = 0;
        offsetHours += 1;
      }

      if (offsetHours === 24) {
        offsetHours = 0;
        offsetDays += 1;
      }

      return { offsetDays, offsetHours, offsetMinutes };
    },

    dragStart,
    userLogout() {
      this.$store.commit("CLEAR_lOCALSTORGE");
      window.location = "/login";
    },
  },
};
</script>

<style lang="scss" src="../../modals/UserInfo/userInfo.scss" scoped></style>
