<template>
  <div class="popup-mobile" v-if="isMobile">
    <p class="tel mobile">
      Номер телефона:
      <span class="text"> {{ user.phone }} </span>
    </p>
    <p class="url mobile">
      Профиль:
      <a class="url-sbis text" :href="user.sbis" target="_blank">
        {{ user.username }}
      </a>
    </p>
    <div class="buttons btn-mobile">
      <button class="change" @click="openEditUserInfo">Изменить данные</button>
      <button class="exit" @click="userLogout">
        <img src="@/assets/img/exit.png" class="exit-icon" alt="Exit" />
        Выйти из аккаунта
      </button>
    </div>
    <div class="draggable-block" @mousedown="dragStart" @touchstart="dragStart">
      <div class="draggable-line"></div>
    </div>
  </div>
</template>

<script>
import { dragStart } from "@/helpers/dragMethodsTop";
import { mapState } from "vuex";
import { closeModal, openModal } from "jenesius-vue-modal";
import EditUserInfoMobile from "@/components/modals/UserInfo/EditUserInfoMobile.vue";

export default {
  name: "UserInfoMobile",

  computed: {
    ...mapState(["user", "isMobile"]),

    openEditUserInfo() {
      openModal(EditUserInfoMobile);
    },

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

<style lang="scss" src="./userInfo.scss" scoped></style>
