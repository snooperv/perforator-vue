<template>
  <div class="block-container">
    <h2 class="block-title">
      Неутвержденные пользователи
      <span class="peers-amount" id="not_approve_users_count">1</span>
    </h2>

    <div id="team_not_approve">
      <div id="peer-3" class="peers">
        <button @click="toggleForm" id="remove_btn3" class="peer dropbtn">
          <span class="peers-pic-manager">
            <img class="avatar" src="@/assets/img/pic.png" alt="Аватар" />
          </span>
          <span class="name" style="margin-left: 0">Сотрудник Дима2</span>
          <a href="#" class="chevron" id="remove_ref3">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </a>
        </button>
        <DropdownPeers v-if="isOpen" />
      </div>
    </div>
  </div>

  <div class="block-container">
    <h2 class="block-title">
      Пользователь не отправил Self Review
      <span class="peers-amount" id="without_sr_users_count">1</span>
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
import DropdownPeers from "@/components/imanager/DropdownPeers";

export default {
  name: "PeerApproval",
  components: { DropdownPeers },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleForm() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
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

.chevron {
  position: relative;
  float: right;
  margin-right: 25px;
  font-size: 1.5em;
  color: #331969;
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

input[type="submit"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
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
</style>
