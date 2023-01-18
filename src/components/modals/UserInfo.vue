<template>
  <div class="popup" id="popup">
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
</template>

<script>
import { closeModal, openModal } from "jenesius-vue-modal";
import EditUserInfo from "@/components/modals/EditUserInfo";
import Cockies from "vue-cookies";
import { mapState } from "vuex";

export default {
  name: "UserInfo",

  computed: {
    ...mapState(["user"]),

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
  },
};
</script>

<style scoped>
/* ------------------ Modal window -------------------- */

p {
  font-size: 18px;
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  color: #222222;
  margin: 0;
}

.popup h3 {
  margin-top: 10px;
  margin-left: -25px;
  font-weight: 1000;
  font-size: 26px;
}

.popup {
  width: 30%;
  position: fixed;
  padding: 15px 65px;
  border-radius: 2em;
  top: 50%;
  left: 50%;
  color: #000;
  transform: translate(-50%, -50%);
  background-color: #f1f1f1;
  transition: opacity 0.5s, linear 0.5s;
  z-index: 1;
  box-shadow: 0 11px 20px rgba(0, 0, 0, 0.25);
}

.popup:target {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.popup .close {
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 2em;
  margin-top: 10px;
  margin-right: 10px;
  color: #f00;
}

.user {
  background-color: #ececf2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1.5em;
  padding: 5px;
  margin-top: 15px;
}

.header-pic {
  width: 135px;
  height: 135px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  float: left;
  left: -35px;
  top: -10px;
}

.avatar {
  width: auto;
  height: 100%;
  margin: 0 auto;
}

.user-info {
  position: relative;
  left: 0;
  display: inline-block;
  text-align: left;
}

.user-info p {
  line-height: 2;
}

.text {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  margin-left: 10px;
}

.url-sbis {
  color: #2c286d;
}

.buttons {
  display: flex;
  width: 100%;
  margin: 5px;
}

.change,
.exit {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #c1c1ec;
  border: none;
  color: white;
  padding: 15px 25px;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.change:hover {
  background-color: rgba(140, 140, 245, 1);
  transition: 0.25s;
  cursor: pointer;
}

.change:active,
.exit:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.change {
  margin-right: 25px;
}

.exit {
  background-color: #cd2525;
}

.exit-icon {
  width: 15px;
  vertical-align: top;
}

@media (max-width: 1707px) {
  .popup {
    width: 31%;
  }
}

@media (max-width: 1536px) {
  .popup {
    width: 34%;
  }
}

@media (max-width: 1397px) {
  .popup {
    width: 38%;
  }
}

@media (max-width: 1229px) {
  .popup {
    width: 43%;
  }
}

@media (max-width: 1024px) {
  .avatar {
    float: none;
    left: 0;
    top: 0;
  }

  .user-info {
    left: 0;
  }

  .buttons {
    /* margin: 5px; */
  }

  .change {
    margin: 3px 0;
  }
}
</style>
