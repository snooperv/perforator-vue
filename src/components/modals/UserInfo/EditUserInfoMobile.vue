<template>
  <div class="popup-mobile" v-if="isMobile">
    <p class="name mobile">
      <span class="name-field">Имя и фамилия:</span>
      <span class="text">
        <input
          type="text"
          name="name"
          :value="user.username"
          placeholder="Имя и фамилия"
          class="fadeIn second"
          required
        />
      </span>
    </p>
    <p class="tel mobile">
      <span class="name-field">Номер телефона:</span>
      <span class="text">
        <input
          type="text"
          name="phone"
          :value="user.phone"
          placeholder="Номер телефона"
          class="fadeIn second"
          required
        />
      </span>
    </p>
    <p class="url mobile">
      <span class="name-field">Профиль:</span>
      <span class="text">
        <input
          type="text"
          name="sbis"
          :value="user.sbis"
          placeholder="Ссылка на профиль"
          class="fadeIn second"
          required
        />
      </span>
    </p>
    <div class="buttons btn-mobile">
      <button class="exit editor" @click="closeEditUserInfo">Отменить</button>
    </div>
    <div class="draggable-block" @mousedown="dragStart" @touchstart="dragStart">
      <div class="draggable-line"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { closeModal, openModal } from "jenesius-vue-modal";
import UserInfoMobile from "@/components/modals/UserInfo/UserInfoMobile.vue";
import { dragStart } from "@/helpers/dragMethods";

export default {
  name: "EditUserInfoMobile",

  computed: {
    ...mapState(["user", "isMobile"]),

    closeEditUserInfo() {
      closeModal();
      openModal(UserInfoMobile);
    },
  },

  methods: {
    dragStart,
  },
};
</script>

<style lang="scss" src="./userInfo.scss" scoped></style>
