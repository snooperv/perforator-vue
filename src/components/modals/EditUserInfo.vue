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
            <img class="avatar" src="@/assets/img/pic.png" alt="Фото профиля" />
          </div>
          <div class="user-info">
            <p class="name">
              Имя и фамилия:
              <span class="text">
                <input
                  type="text"
                  name="name"
                  value="Менеджер Сергей1"
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
                  value="+79876543211"
                  placeholder="Номер телефона"
                  class="fadeIn second"
                  required
                />
              </span>
            </p>
            <p class="url">
              Профиль СБИС:
              <span class="text">
                <input
                  type="text"
                  name="sbis"
                  value="https://sbis.com"
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
import UserInfo from "@/components/modals/UserInfo";

export default {
  name: "EditUserInfo",

  computed: {
    closeEditUserInfo() {
      closeModal();
      openModal(UserInfo);
    },
  },
};
</script>

<style scoped>
#changeData h3 {
  margin-top: 10px;
  margin-left: -25px;
  font-weight: 1000;
  font-size: 26px;
}

#changeData {
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

#changeData:target {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

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

.logo-title h3 {
  padding-left: 10px;
  color: White;
  font-size: 28px;
  float: left;
  font-weight: 500;
  margin-top: 0.9em;
}

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
