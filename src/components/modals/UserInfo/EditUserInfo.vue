<template>
  <div id="changeData">
    <form>
      <div class="popup-content">
        <a class="close">
          <!--        Нужно доработать корректность отображения            -->
          <!--<i class="fas fa-times"></i>-->
        </a>
        <h3>Изменение данных</h3>
        <div class="user">
          <div class="header-pic">
            <img class="avatar" :src="user.photo" alt="Фото профиля" />
          </div>
          <div class="user-info">
            <p class="name">
              Имя и фамилия:
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
            <p class="tel">
              Номер телефона:
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
            <p class="url">
              Профиль:
              <span class="text">
                <input
                  type="text"
                  name="sbis"
                  :value="user.sbis"
                  placeholder="Ссылка на профиль СБИС"
                  class="fadeIn second"
                  required
                />
              </span>
            </p>
          </div>
        </div>
        <div class="buttons">
          <button class="change">Сохранить данные</button>
          <!-- Я пока что оставлю эту кнопку, когда созвонюсь с Вовой - уберу -->
          <input
            type="button"
            class="exit"
            id="btn_cancel"
            value="Отменить"
            @click="closeEditUserInfo"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { closeModal, openModal } from "jenesius-vue-modal";
import UserInfo from "@/components/modals/UserInfo/UserInfo.vue";
import { mapState } from "vuex";

export default {
  name: "EditUserInfo",

  computed: {
    ...mapState(["user"]),
    closeEditUserInfo() {
      closeModal();
      openModal(UserInfo);
    },
  },
};
</script>

<style lang="scss" src="./editUserInfo.scss" scoped></style>