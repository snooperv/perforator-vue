<template>
  <div class="peers">
    <div class="date">
      <h2>Q2</h2>
      <span class="period"> 01.01.2023 - 14.01.2023</span>
    </div>

    <div v-for="worker in myTeam">
      <button
        @click="() => (worker.isDropdown = !worker.isDropdown)"
        class="peer dropbtn"
      >
        <span class="peers-pic">
          <img :src="API_URL() + worker.photo" class="avatar" alt="Аватар" />
        </span>
        <span class="name">{{ worker.username }}</span>

        <span class="position" v-if="isManager"> Мой руководитель</span>
        <a href="#" id="chev-1" class="chevron rotate">
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </a>
      </button>
      <DropdownForm
        v-if="worker.isDropdown"
        :my-id="user.myId"
        :worker-id="worker.profile_id"
      />
    </div>
  </div>
</template>

<script>
import DropdownForm from "@/components/OneToOne/DropdownForm";
import { mapState } from "vuex";
import { API_URL } from "@/helpers/api";

export default {
  name: "Current",
  components: { DropdownForm },

  data() {
    return {
      myTeam: [],
      isManager: localStorage.getItem("isManager") !== "true",
    };
  },

  mounted() {
    if (localStorage.getItem("isManager") === "true") {
      this.myTeam = this.user.team;
    } else {
      !this.user.manager && this.$store.dispatch("getMyManager");
      this.myTeam = this.user.manager;
    }
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    toggleForm() {
      this.isOpen = !this.isOpen;
    },
  },

  watch: {
    "user.team": {
      handler() {
        this.myTeam = this.user.team;
      },
    },

    "user.manager": {
      handler() {
        this.myTeam = this.user.manager;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
  color: #222;
  font-size: 32px;
}

.date {
  font-weight: 400;
  text-align: left;
  line-height: 1;
  height: 70px;
}

.peers {
  width: 90%;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
  top: 50px;
  padding: 0 0 35px 50px;
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
  border-radius: 15px;
  height: 65px;
  margin-top: 20px;
  cursor: pointer;
}

.peer .position {
  color: #edbd31;
  font-weight: 400;
  position: relative;
  float: right;
  right: 50px;
}

.peer .name {
  float: left;
  /*margin-left: 30px;*/
  position: relative;
  color: #331969;
  font-family: "Gotham Pro", sans-serif;
  font-size: 22px;
  font-weight: 1000;
}

.chevron {
  position: absolute;
  font-size: 1.5em;
  right: 20px;
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

.rotate {
  -moz-transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.rotate.down {
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.peers-pic {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  float: left;
  left: -25px;
  top: -22px;

  img {
    width: 75px;
    height: 75px;
    object-fit: cover;
  }
}
</style>
