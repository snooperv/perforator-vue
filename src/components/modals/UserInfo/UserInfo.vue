<template>
  <div>
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

    <div class="popup-mobile" v-if="isMobile">
      <div class="draggable-block" @mousedown="dragStart">
        <div class="draggable-line"></div>
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

    dragStart(e) {
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.dragStop);
    },

    drag(e) {
      const popup =
        e.target.closest(".popup-mobile") ||
        e.target.querySelector(".popup-mobile");
      if (popup && popup.offsetHeight <= 220) {
        popup.style.height = e.y - 57 + "px";
      }
    },

    dragStop(e) {
      const popup =
        e.target.closest(".popup-mobile") ||
        e.target.querySelector(".popup-mobile");
      if (popup.offsetHeight > 100) {
        popup.style.height = "200px";
      } else {
        closeModal();
      }
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.dragStop);
    },
  },
};
</script>

<style lang="scss" src="./userInfo.scss" scoped></style>
