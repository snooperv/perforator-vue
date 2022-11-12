<template>
  <div class="header">
    <div class="wrapper">
      <div class="logo-div">
        <img src="@/assets/img/logo.svg" alt="logo" class="logo" />
      </div>
      <div class="logo-title">
        <h3>Perforator</h3>
      </div>
    </div>
    <div class="rightWrapper">
      <div class="timer">
        <span class="untill">До завершения Self Review</span>
        <span class="under" style="margin-left: 3px">дней</span>
        <span id="days" class="time">-263</span> :
        <span class="under">часов</span>
        <span id="hours" class="time">-16</span> :
        <span class="under">минут</span>
        <span id="minutes" class="time">-15</span>
      </div>
      <a @click="openUserInfo"
        ><img
          src="@/assets/img/settings.svg"
          alt="settings"
          class="settings rightIcon btn"
      /></a>
    </div>
  </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal";
import UserInfo from "@/components/modals/UserInfo";

export default {
  name: "Header",

  computed: {
    openUserInfo() {
      openModal(UserInfo);
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
  margin: 0;
}

p {
  font-size: 18px;
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  color: #222222;
  margin: 0;
}

.header {
  position: fixed;
  height: 75px;
  width: 100%;
  background-color: #454545;
  top: -10px;
  border-radius: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1000;
}

.logo-title h3 {
  padding-left: 10px;
  color: White;
  font-size: 28px;
  float: left;
  font-weight: 500;
  margin-top: 0.9em;
}

.wrapper {
  float: left;
}

.logo-div {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 35px;
}

.logo-title {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
}

.logo {
  width: 32px;
}

.rightWrapper {
  float: right;
  margin-top: 25px;
  margin-right: 25px;
}

.rightIcon {
  width: 30px;
}

.rightIcon:hover {
  cursor: pointer;
}

.rightIcon:active {
  transform: scale(0.9);
  transition: 0.1s;
}

.settings {
  width: 35px;
}

.timer {
  display: inline-block;
  color: #2c2c2c;
  position: relative;
  top: -18px;
  margin-right: 15px;
  font-weight: 1000;
  font-size: 14px;
}

.untill {
  position: relative;
  top: 3px;
  font-weight: 400;
  margin-right: 7px;
  color: #9c9c9c;
}

.time {
  padding: 4px 0;
  background-color: #2c2c2c;
  text-align: center;
  width: 35px;
  border-radius: 5px;
  display: inline-block;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  /*color: #A5A4F5;*/
  color: #cb2525;
}

.under {
  position: absolute;
  top: 29px;
  font-weight: normal;
  letter-spacing: 0.025em;
  font-size: 11px;
  color: #9c9c9c;
}

.btn {
  transition: 0.3s;
}

@media (max-width: 800px) {
  .wrapper {
    position: relative;
    left: 4%;
  }

  .logo-div {
    margin-left: -10px;
  }
}
</style>
