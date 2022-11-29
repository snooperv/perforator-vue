<template>
  <div class="block-container">
    <h2 class="block-title">
      Неутвержденные пользователи
      <span class="peers-amount" id="not_approve_users_count">1</span>
    </h2>

    <div id="team_not_approve">
      <div id="peer-3" class="peers">
        <button onclick="myFunction3()" id="remove_btn3" class="peer dropbtn">
          <span class="peers-pic-manager">
            <img class="avatar" src="@/assets/img/pic.png" alt="Аватар" />
          </span>
          <span class="name" style="margin-left: 0">Сотрудник Дима2</span>
          <a href="#" class="chevron" id="remove_ref3">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </a>
        </button>

        <div id="myDropdown3" class="dropdown-content">
          <div class="dropdown-container" id="my_peers">
            <div class="dropdown-description">
              пиры, которых выбрал сотрудник
            </div>

            <div class="selected-peer" id="my-peer34" style="display: block">
              <img
                class="selected-peer-avatar"
                src="@/assets/img/pic.png"
                alt="Аватар"
              />
              <div class="selected-peer-name">Сотрудник Вадим3</div>
              <a class="close delete-peer" onclick="remove_peer_remote(3, 4)">
                <i class="fas fa-times" aria-hidden="true"></i>
              </a>
            </div>

            <div class="selected-peer" id="my-peer35" style="display: block">
              <img
                class="selected-peer-avatar"
                src="@/assets/img/pic.png"
                alt="Аватар"
              />
              <div class="selected-peer-name">Сотрудник Никита4</div>
              <a class="close delete-peer" onclick="remove_peer_remote(3, 5)">
                <i class="fas fa-times" aria-hidden="true"></i>
              </a>
            </div>

            <div class="selected-peer" id="my-peer36" style="display: block">
              <img
                class="selected-peer-avatar"
                src="@/assets/img/pic.png"
                alt="Аватар"
              />
              <div class="selected-peer-name">Сотрудник Вова5</div>
              <a class="close delete-peer" onclick="remove_peer_remote(3, 6)">
                <i class="fas fa-times" aria-hidden="true"></i>
              </a>
            </div>

            <div>
              <a id="choose3" onclick="replace_list_peers(3)">
                <button class="add-peer" onclick="add_peers()">
                  <i class="icon-plus fas fa-plus" aria-hidden="true"></i>
                  Добавить пира
                </button>
              </a>
              <input
                class="accept"
                type="submit"
                value="утвердить"
                onclick="approve_user(3)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block-container">
    <h2 class="block-title">
      Пользователь не отправил Self Review
      <span class="peers-amount" id="without_sr_users_count">9</span>
    </h2>
    <div id="team_without_self_review">
      <div id="peer-4" class="peers">
        <button id="remove_btn4" class="peer dropbtn" style="cursor: default">
          <span class="peers-pic-manager">
            <img class="avatar" src="@/assets/img/pic.png" alt="Аватар" />
          </span>
          <span class="name" style="margin-left: 0">Сотрудник Вадим3</span>
        </button>
      </div>
    </div>
  </div>

  <div class="block-container">
    <h2 class="block-title">
      Утверждённые пользователи
      <span class="peers-amount last" id="approve_users_count">0</span>
    </h2>
    <div id="team_approve"></div>
  </div>
</template>

<script>
export default {
  name: "PeerApproval",
};
</script>

<style lang="scss" scoped>
.manager {
  margin-left: 50px;
}

.double-links {
  display: inline-block;
  margin-top: 25px;
  padding: 10px 0;
  background-color: #fff;
  border-radius: 25px;
  border: 1px solid #edbd31;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.d-link {
  background-color: transparent;
  border-radius: 20px;
  padding: 12px 30px 11px 30px;
  letter-spacing: 1px;
  font-weight: 1000;
  font-family: "Gotham Pro light", sans-serif;
}

.dactive {
  background: #a5a4f5;
  color: #fff;
}

.main-cont {
  display: block;
}

.hide {
  display: none;
}

.second-link {
  margin-left: -15px;
}

.block-container {
  margin-top: 30px;
  width: 90%;
  background: #ffffff;
  border-radius: 30px;
  padding-bottom: 15px;
  margin-bottom: 50px;
}

.block-title {
  padding: 20px 15px 5px 35px;
}

.main-title {
  color: #000;
  text-align: left;
  padding: 25px 0 0 10px;
  font-size: 26px;
  letter-spacing: -0.5px;
  margin-bottom: 0;
}

.me-estimate {
  margin-left: 50px;
}

.peers {
  margin-bottom: 15px;
  margin-left: 60px;
}

.peers span {
  font-size: 22px;
  color: #222222;
}

.peers p {
  font-weight: 1000;
  text-align: left;
  font-size: 14px;
  margin-left: 30px;
  color: #414141;
}

.peer {
  display: block;
  width: 95%;
  background-color: #ececf2;
  border-radius: 20px;
  height: 65px;
}

.peer .name {
  float: left;
  margin-left: 60px;
  position: relative;
  top: -2px;
  color: #331969;
  font-family: "Gotham Pro", sans-serif;
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -1px;
}

.selected-peer-name {
  font-size: 22px;
  margin-top: -60px;
  margin-left: 50px;
  color: #2c286d;
}

.peer-avatar {
  position: absolute;
  float: left;
  left: -15px;
  top: -4px;
  width: 75px;
}

.block-peer-avatar {
  position: absolute;
  width: 70px;
  float: left;
}

.block-peer {
  display: block;
  width: 95%;
  background-color: #ececf2;
  border-radius: 20px;
  height: 65px;
  margin-top: 20px;
  margin-right: 20px;
}

.chevron {
  position: relative;
  float: right;
  margin-right: 25px;
  font-size: 1.5em;
  color: #331969;
}

.delete-peer {
  cursor: pointer;
  position: relative;
  float: right;
  margin-top: -25px;
  margin-right: 10px;
  font-size: 1.5em;
  color: #d32e2e;
}

.dropbtn {
  background-color: #ececf2;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #ececf2;
}

.dropdown-content {
  display: none;
  padding-top: 50px;
  background-color: #ececf2;
  width: 95%;
  border-radius: 15px;
  transform: translateY(-50px);
  position: relative;
  z-index: 1;
}

.dropdown-container {
  margin-left: 70px;
  padding-bottom: 10px;
}

.show {
  display: block;
}

.dropdownTitle {
  margin: 20px 0 5px 0;
  color: #2b2b2b;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -1px;
  text-align: left;
}

.accept {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #a5a4f5;
  border: none;
  color: white;
  padding: 10px 30px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  display: block;
  margin-top: 20px;
  margin-bottom: 25px;
}

input[type="submit"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.dropdown-description {
  color: #848484;
  margin-bottom: 15px;
  font-size: 16px;
}

.selected-peer {
  padding: 14px 10px 14px 10px;
  width: 95%;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
}

.selected-peer-avatar {
  /*float: left;*/
  position: relative;
  width: 57px;
  height: 57px;
  left: -20px;
  top: -15px;
  border-radius: 50%;
}

.add-peer {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  font-size: 12px;
  letter-spacing: 1px;
  border: none;
  background-color: #a5a4f5;
  color: white;
  cursor: pointer;
  border-radius: 25px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  padding: 7px 12px;
  margin-top: 5px;
  position: relative;
  /*left: -60px;*/
}

.add-peer:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.icon-plus {
  color: #fff;
}

.no-sr-peer-avatar {
  float: left;
  width: 75px;
  position: relative;
  left: -15px;
  top: -4px;
}

.block-name {
  float: left;
  position: relative;
  top: 20px;
  color: #331969 !important;
  font-family: "Gotham Pro", sans-serif;
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -1px;
}

.peers-amount {
  font-size: 18px;
  color: #fff;
  background-color: #edbd31;
  padding: 5px;
  text-align: center;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: inline-block;
  margin-left: 10px;
}

.last {
  background-color: #a5a4f5;
}

.inside-wrapper {
  display: inline-block;
  margin-left: 45px;
}

.items {
  width: 80%;
  background-color: #f4f4fa;
  font-size: 20px;
  font-weight: 400;
  color: #333;
  border-radius: 20px;
  height: 60px;
  line-height: 60px;
  padding-left: 25px;
  margin-bottom: 5px;
  display: inline-block;
  float: left;
}

.sum {
  font-family: "Gotham Pro", sans-serif;
  font-weight: 1000;
  color: #4c4b9a;
}

.grade {
  display: inline-block;
  float: left;
  width: 100px;
  height: 60px;
  border-radius: 20px;
  background-color: #f4f4fa;
  margin-left: 5px;
}

.grade-number {
  font-size: 20px;
  color: #fff;
  padding: 5px;
  text-align: center;
  border-radius: 25px;
  width: 60px;
  height: 32px;
  line-height: 32px;
  display: inline-block;
  margin-left: 15px;
  margin-top: 9px;
}

.great {
  background-color: #a5a4f5;
}

.good {
  background-color: #edbd31;
}

.bad {
  background-color: #cd2525;
}

.rating-name {
  font-size: 22px;
}

.block-description {
  font-size: 15px;
  color: #2c286d;
  font-weight: 1000;
  margin: -20px 0 25px 35px;
}

.name-link {
  color: #2c286d;
  position: relative;
  left: -10px;
}

.rating-peer-avatar {
  width: 63px;
  float: left;
  position: relative;
  left: -30px;
}

.peers-pic-manager {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  float: left;
  left: -25px;
  top: -19px;

  img {
    width: 100%;
  }
}

.peers-pic-raiting {
  width: 63px;
  height: 63px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  float: left;
  left: -30px;
}
</style>
