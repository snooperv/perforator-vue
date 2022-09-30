<template>
  <div class="header">
    <div class="wrapper">
      <div class="logo-div">
        <img src="@/assets/logo.svg" alt="logo" class="logo">
      </div>
      <div class="logo-title">
        <h3>Perforator</h3>
      </div>
    </div>
    <div class="rightWrapper">
      <div class="timer">
        <span class="untill">До завершения Self Review</span>
        <span class="under" style="margin-left: 3px;">дней</span>
        <span id="days" class="time">-263</span> :
        <span class="under">часов</span>
        <span id="hours" class="time">-16</span> :
        <span class="under">минут</span>
        <span id="minutes" class="time">-15</span>
      </div>
      <a href="#popup"><img src="@/assets/settings.svg" alt="settings" class="settings rightIcon btn"></a>
    </div>

    <div id="changeData">
      <form method="post">
        <div class="popup-content">
          <a href="" class="close">
            <!--        Нужно доработать корректность отображения            -->
            <!--<i class="fas fa-times"></i>-->
          </a>
          <h3>Изменение данных</h3>
          <div class="user">
            <div class="header-pic">
              <img class="avatar" src="@/assets/pic.png" alt="Фото профиля">
            </div>
            <div class="user-info">
              <input type="hidden" name="csrfmiddlewaretoken"
                     value="JMooJe9NzzVHIPzMt0Xjp0TVf4c8NhT0YZm0G8lfaXzVEvNQieKdguEmmXObBeP2">

              <p class="name">Имя и фамилия:
                <span class="text">
                                <input type="text" name="name" value="Менеджер Сергей1" placeholder="Имя и фамилия"
                                       class="fadeIn second" required="" id="id_name">
                            </span>
              </p>
              <p class="tel">Номер телефона:
                <span class="text">
                                <input type="text" name="phone" value="+79876543211" placeholder="Номер телефона"
                                       class="fadeIn second" required="" id="id_phone">
                            </span>
              </p>
              <p class="url">Профиль СБИС:
                <span class="text">
                                <input type="text" name="sbis" value="https://sbis.com"
                                       placeholder="Ссылка на профиль СБИС" class="fadeIn second" required=""
                                       id="id_sbis">
                            </span>
              </p>
            </div>
          </div>
          <div class="buttons">
            <button class="change" type="submit">Сохранить данные</button>
            <!-- Я пока что оставлю эту кнопку, когда созвонюсь с Вовой - уберу -->
            <input type="button" class="exit" id="btn_cancel" value="Отменить">
          </div>
        </div>
      </form>
    </div>
    <!--<a href="#" class="close-changeData"></a>-->

    <div class="popup" id="popup">
      <div class="popup-content">
        <a href="" class="close">
          <i class="fas fa-times" aria-hidden="true"></i>
        </a>
        <h3>Мои данные</h3>
        <div class="user">
          <div class="header-pic">
            <img class="avatar" src="@/assets/pic.png" alt="Фото профиля">
          </div>
          <div class="user-info">
            <p class="name">Имя и фамилия:
              <span class="text">
                Менеджер Сергей1
              </span>
            </p>
            <p class="tel">Номер телефона:
              <span class="text">
                +79876543211
              </span>
            </p>
            <p class="url">Профиль СБИС:
              <a class="url-sbis text" href="https://sbis.com" target="_blank">
                Менеджер Сергей1
              </a>
            </p>
          </div>
        </div>
        <div class="buttons">
          <button class="change" id="btn-change">Изменить данные</button>
          <!--          <a href="">-->
          <button class="exit" @click="userLogout">
            <img src="@/assets/exit.png" class="exit-icon" alt="Exit">
            Выйти из аккаунта
          </button>
          <!--          </a>-->
        </div>
      </div>
    </div>
    <a href="" class="close-popup"></a>
  </div>
</template>

<script>
export default {
  name: "Header",

  methods: {
    userLogout() {
      this.$store.dispatch("userLogout");
    },
  },
}
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
  background-color: #F1F1F1;
  visibility: hidden;
  opacity: 0;
  transition: opacity .5s, linear .5s;
  z-index: 1;
  box-shadow: 0px 10.991px 19.7838px rgba(0, 0, 0, 0.25);
}

#changeData:target {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.changeData .close {
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 2em;
  margin-top: 10px;
  margin-right: 10px;
  color: #f00;
}

.close-changeData {
  background-color: rgba(0, 0, 0, .7);
  cursor: default;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity .5s, visibility 0s linear .5s;
}

#changeData:target + .close-changeData {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}

h3 {
  text-align: left;
  margin: 0;
}

p {
  font-size: 18px;
  font-family: 'Gotham Pro light';
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

.icon:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
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

.notification {
  position: relative;
  margin-right: 15px;
}

.toggle {
  float: left;
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

#popup {
  display: inline-block;
}

label #bars,
label #cancel {
  color: white;
  font-size: 40px;
  float: left;
  margin-left: -10px;
  margin-top: 20px;
  cursor: pointer;
  margin-right: 30px;
  display: none;
}

#check {
  display: none;
}

@media (max-width: 800px) {
  .wrapper {
    position: relative;
    left: 4%;
  }

  .logo-div {
    margin-left: -10px;
  }

  label #bars {
    display: block;
  }

  #check:checked ~ label #btn {
    display: none;
  }

  #check:checked ~ label #cancel {
    display: block;
  }
}

/* ------------------ Modal window -------------------- */

.btn {
  transition: .3s;
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
  background-color: #F1F1F1;
  visibility: hidden;
  opacity: 0;
  transition: opacity .5s, linear .5s;
  z-index: 1;
  box-shadow: 0px 10.991px 19.7838px rgba(0, 0, 0, 0.25);
}

.popup:target {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.popup .close {
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 2em;
  margin-top: 10px;
  margin-right: 10px;
  color: #f00;
}

.close-popup {
  background-color: rgba(0, 0, 0, .7);
  cursor: default;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity .5s, visibility 0s linear .5s;
}

.popup:target + .close-popup {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}

.user {
  background-color: #ECECF2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  left: 0px;
  display: inline-block;
  text-align: left;
}

.user-info p {
  line-height: 2;
}

.text {
  font-family: 'Gotham Pro light';
  font-weight: 1000;
  margin-left: 10px;
}

.url-sbis {
  color: #2C286D;
}

.buttons {
  display: inline-block;
  margin: 5px;
}

.change, .exit {
  font-family: 'Gotham Pro light';
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

.change:active, .exit:active {
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
  background-color: #CD2525;
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
    left: 0px;
    top: 0px;
  }

  .user-info {
    left: 0px;
  }

  .buttons {
    /* margin: 5px; */
  }

  .change {
    margin: 3px 0;
  }
}
</style>