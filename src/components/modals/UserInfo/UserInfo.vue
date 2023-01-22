<template>
  <div class="popup" id="popup" v-if="!isMobile">
    <div class="popup-content">
      <a class="close" @click="closeUserInfo">
        <i class="fas fa-times" aria-hidden="true"></i>
      </a>
      <h3>Мои данные</h3>
      <div class="user">
        <div class="header-pic">
          <img class="avatar" :src="user.photo" alt="Фото профиля" />
        </div>
        <div class="user-info">
          <p class="name">
            Имя и фамилия:
            <span class="text"> {{ user.username }} </span>
          </p>
          <p class="tel">
            Номер телефона:
            <span class="text"> {{ user.phone }} </span>
          </p>
          <p class="url">
            Профиль СБИС:
            <a class="url-sbis text" :href="user.sbis" target="_blank">
              {{ user.username }}
            </a>
          </p>
        </div>
      </div>
      <div class="buttons">
        <button
          class="change"
          @click="becomeManager"
          v-if="!user.statusManager"
        >
          Я менеджер
        </button>

        <button class="change" @click="openEditUserInfo">
          Изменить данные
        </button>
        <!--          <a href="">-->
        <button class="exit" @click="userLogout">
          <img src="@/assets/img/exit.png" class="exit-icon" alt="Exit" />
          Выйти из аккаунта
        </button>
        <!--          </a>-->
      </div>
    </div>
  </div>
</template>

<script>
import { closeModal, openModal } from "jenesius-vue-modal";
import EditUserInfo from "@/components/modals/UserInfo/EditUserInfo.vue";
import Cockies from "vue-cookies";
import { mapState } from "vuex";

export default {
  name: "UserInfo",

  computed: {
    ...mapState(["user", "isMobile"]),

    openEditUserInfo() {
      openModal(EditUserInfo);
    },

    closeUserInfo() {
      closeModal();
    },
  },

  methods: {
    userLogout() {
      this.$store.commit("CLEAR_lOCALSTORGE");
      window.location = "/login";
    },

    async becomeManager() {
      const attempt = confirm(
        "Подтвердите, что вы менеджер. Данное действие нельзя отменить"
      );
      if (attempt) {
        await this.$store.dispatch("setManagerStatus");
        await this.$store.dispatch("getManagerStatus", this.user.myId);
      }
    },
  },
};
</script>

<style lang="scss" src="./userInfo.scss" scoped></style>
