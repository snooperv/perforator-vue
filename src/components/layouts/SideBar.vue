<template>
  <div class="sidebar">
    <div class="profile-div">
      <div class="profile-pic">
        <img class="photo-sidebar" :src="user.photo" alt="Фото профиля" />
      </div>
      <div class="profile-name">
        <h2>{{ user.username }}</h2>
      </div>
    </div>

    <div class="menu-items">
      <div class="perfomance link-container" style="font-size: 22px">
        <img
          src="@/assets/img/perfomance-review-icon.svg"
          width="20"
          height="20"
          alt="perfomance review icon"
        />
        Perfomance Review
      </div>
    </div>
    <div class="menu-items" id="menuItems">
      <nav class="side-btn small">
        <router-link to="/self-review" class="link">
          <div class="link-container">self review</div>
        </router-link>
      </nav>
      <nav class="side-btn small">
        <router-link to="/i-rate" class="link">
          <div class="link-container">
            я оцениваю
            <!--<div class="amount-bg"></div>
            <span class="amount">10 из 15</span>-->
          </div>
        </router-link>
      </nav>
      <nav class="side-btn small" v-if="user.statusManager">
        <router-link to="/i-manager" class="link">
          <div class="link-container">
            я менеджер
            <!-- Нужно будет поправить, сделал набросок -->
            <!--<div class="amount-bg second"></div>
            <span class="amount">1 из 8</span>-->
            <!-- -------------------------------------- -->
          </div>
        </router-link>
      </nav>
      <nav class="side-btn small">
        <router-link to="/1to1" class="link">
          <div class="link-container">1-on-1</div>
        </router-link>
      </nav>
      <router-link to="/last-periods" tag="button" class="side-btn link">
        <div class="link-container">
          <img
            src="@/assets/img/history.svg"
            width="20"
            height="20"
            alt="История"
          />
          Прошлые периоды оценки
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SideBar",

  computed: {
    ...mapState(["user"]),
  },

  // mounted() {
  //   this.$store.dispatch("getMyTeam");
  // },

  watch: {
    "user.myId": {
      handler() {
        this.$store.dispatch("getManagerStatus", this.user.myId);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.photo-sidebar {
  width: 132px;
  height: 132px;
  object-fit: cover;
}

a {
  text-decoration: none;
  color: #000000;
}

.sidebar {
  position: fixed;
  width: 20vw;
  height: 100vh;
  background-color: #f8f8fa;
  border-right: 1px solid #e7e7e7;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.profile-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  margin-left: 20px;
  margin-top: 100px;
  margin-right: 20px;
}

.profile-div h2 {
  width: 100%;
  margin: 0;
  font-size: 26px;
  font-weight: 1000;
  line-height: 27px;
  letter-spacing: 0;
}

.profile-div p {
  position: relative;
  top: -0.25em;
  color: #414141;
  line-height: 1.25;
}

.profile-pic {
  width: 132px;
  height: 132px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}

.profile-name {
  position: relative;
  display: inline-block;
  text-align: center;
  top: 0.5em;
}

.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 0;
}

.side-btn {
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  background-color: transparent;
  margin: 0.2em 15px 0 5px;
}

.perfomance {
  border: none;
  padding: 10px 0;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  background-color: transparent;
  margin: 15px 15px 0 5px;
}

.side-btn.small {
  margin-left: 3.75em;
  font-size: 18px;
  font-weight: 400;
}

.side-btn:hover {
  background-color: rgba(165, 164, 245, 0.25);
  border-radius: 2em;
  transition: 0.2s;
}

.link {
  display: inline-block;
  width: 100%;
  padding: 10px 0;
}

.router-link-active {
  position: relative;
  color: #000 !important;
  background-color: rgba(165, 164, 245, 0.56);
  border-radius: 3em;
  transition: 0.2s;
  display: inline-block;
}

.imanager_disable {
  pointer-events: none;
}

/* Нужно доделать, чтобы было красиво */
.amount {
  position: absolute;
  font-size: 14px;
  margin-top: 0.2em;
  margin-left: 1em;
}

/*------------------------------------------*/

.amount-bg {
  position: absolute;
  width: 65px;
  height: 20px;
  background-color: #edbd31;
  border-radius: 0.5em;
  margin-top: -1.1em;
  margin-left: 6.5em;
}

.amount-bg.second {
  width: 48px;
  margin-left: 6.75em;
}

.link-container {
  text-align: left;
  margin-left: 20px;
  display: flex;
  align-items: center;

  img {
    margin-right: 7px;
  }
}

.side-btn:last-child {
  color: #8e8e8e;
  font-weight: 400;
}

@media (max-width: 800px) {
  h2 {
    text-align: center;
  }

  .profile-div {
    margin-top: 80px;
  }

  .profile-name {
    margin-left: 0;
  }

  .menu-items {
    margin-top: -10px;
  }

  .profile-pic {
    position: relative;
    left: 10px;
  }
}

@media (max-width: 1535px) {
  .side-btn:last-child {
    font-size: 16px;
  }

  .profile-pic {
    width: 102px;
    height: 102px;

    .photo-sidebar {
      width: 102px;
      height: 102px;
    }
  }

  .profile-name {
    /* margin-left: 0px; */
    position: relative;
  }

  .menu-items {
    margin-top: 10px;
  }

  .link-container {
    font-size: 16px;
  }

  .side-btn:last-child {
    font-size: 12px;
  }

  .side-btn.small {
    margin-left: 0;
  }

  .side-btn {
    margin-left: 0;
  }
}

@media (max-width: 800px) {
  .sidebar {
    display: none;
  }
}

@media (max-height: 600px) {
  .sidebar {
    overflow-y: scroll;
  }
}

#i_manager_button {
  display: none;
}
</style>
