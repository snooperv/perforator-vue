<template>
  <div class="header" v-if="!isMobile">
    <div class="wrapper">
      <div class="logo-div">
        <img src="@/assets/img/logo.svg" alt="logo" class="logo" />
      </div>
      <div class="logo-title">
        <h3>Perforator</h3>
      </div>
    </div>
    <div class="rightWrapper">
      <div
        class="timer"
        v-if="
          prStatus && prStatus.status !== 'no pr' && prStatus.pr_status !== 0
        "
      >
        <span class="untill">До завершения {{ getStage }}</span>
        <span class="under" style="margin-left: 3px">дней</span>
        <span id="days" class="time">{{ getDays }}</span> :
        <span class="under">часов</span>
        <span id="hours" class="time">{{ getHours }}</span> :
        <span class="under">минут</span>
        <span id="minutes" class="time">{{ getMinutes }}</span>
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
      <a @click="openUserInfo"
        ><img
          src="@/assets/img/settings.svg"
          alt="settings"
          class="settings rightIcon btn"
      /></a>
    </div>
  </div>

  <div class="header-mobile" v-if="isMobile">
    <div class="user-info">
      <div class="avatar">
        <img :src="user.photo" alt="Фото" />
      </div>
      <div class="user-name">
        {{ user.username }}
      </div>
    </div>
    <div class="mobile-settings">
      <div class="mobile-time" @click="openTime">
        <img src="@/assets/img/carbonTime.svg" alt="Время" />
      </div>
      <div class="user-setting" @click="openUserInfoMobile">
        <img src="@/assets/img/buttonSettings.svg" alt="Настройки" />
      </div>
    </div>
  </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal";
import UserInfo from "@/components/modals/UserInfo/UserInfo.vue";
import { mapState } from "vuex";
import EditUserInfo from "@/components/modals/UserInfo/EditUserInfo.vue";
import HeaderTime from "@/components/layouts/Header/HeaderTime.vue";
import UserInfoMobile from "@/components/modals/UserInfo/UserInfoMobile.vue";

export default {
  name: "Header",

  mounted() {
    this.$store.dispatch("getStatusPerformanceReview");
  },

  methods: {
    parseDate() {
      const dateNow = new Date();
      const deadline = new Date(this.prStatus.deadline);
      const offset = deadline - dateNow;
      let offsetMinutes = Math.ceil((offset / 1000 / 60) % 60);
      let offsetHours = Math.floor(offset / 1000 / 60 / 60);
      const offsetDays = Math.floor(offset / 1000 / 60 / 60 / 24);
      if (offsetMinutes === 60) {
        offsetMinutes = 0;
        offsetHours += 1;
      }

      return { offsetDays, offsetHours, offsetMinutes };
    },
  },

  computed: {
    ...mapState(["isMobile", "user", "prStatus"]),
    openUserInfo() {
      openModal(UserInfo);
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

    openUserInfoMobile() {
      openModal(UserInfoMobile);
    },

    openTime() {
      openModal(HeaderTime);
    },
  },
};
</script>

<style lang="scss" src="./header.scss" scoped></style>
