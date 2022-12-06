<template>
  <div class="selection">
    <a class="close" @click="closeModalPeers">
      <i class="fas fa-times" aria-hidden="true"></i>
    </a>
    <h3>Выберите оценивающего</h3>
    <input type="text" v-model="search" class="peers-text" />
    <div id="list_peers">
      <div
        v-for="peer in searchPeers"
        :id="'peer-' + peer.profile_id"
        :key="peer.profile_id"
        style="margin: 0 25px 0 5px"
      >
        <div class="one-peer" v-if="peer.profile_id !== 1">
          <div class="peers-pic">
            <img class="avatar" src="@/assets/img/pic.png" alt="Avatar" />
          </div>
          <div class="peer-info">{{ peer.username }}</div>
          <button class="choose" @click="selectPeerRemote(peer.profile_id)">
            Выбрать
          </button>
        </div>
      </div>
    </div>
    <!--Сюда добавляются все пиры, которых можно выбрать-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { closeModal } from "jenesius-vue-modal";

export default {
  name: "PeersList",

  props: ["isManager"],

  data() {
    return {
      search: "",
    };
  },

  computed: {
    ...mapState(["peersAll"]),

    searchPeers: function () {
      const search = this.search.toLowerCase();
      if (search) {
        return this.peersAll.filter((option) =>
          option.username.toLowerCase().includes(search)
        );
      }
      return this.peersAll;
    },

    closeModalPeers() {
      closeModal();
    },
  },

  mounted() {
    this.$store.dispatch("getAllPeers", this.isManager);
  },

  methods: {
    selectPeerRemote(id) {
      this.$store.dispatch("addMyPeer", id);
    },
  },
};
</script>

<style scoped>
.selection h3 {
  margin: 10px 0 0;
  font-weight: 1000;
  font-size: 26px;
}

.selection {
  height: 364px;
  width: 30%;
  position: fixed;
  padding: 5px 50px 15px 30px;
  border-radius: 2em;
  top: 40%;
  left: 50%;
  color: #000;
  transform: translate(-50%, -50%);
  background-color: #f1f1f1;
  z-index: 10;
  box-shadow: 0 11px 20px rgba(0, 0, 0, 0.25);
}

#list_peers {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 107%;
  height: 250px;
}

#list_peers::-webkit-scrollbar {
  width: 10px;
  background-color: #f1f1f1;
  border-radius: 10px;
}

#list_peers::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #a6a6ef;
}

#list_peers::-webkit-scrollbar-track {
  width: 0;
}

.selection:target {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.selection .close {
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 2em;
  margin-top: 10px;
  margin-right: 10px;
  color: #f00;
  cursor: pointer;
}

.peers-text {
  background-color: #ffffff;
  color: #0d0d0d;
  padding: 15px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 100%;
  height: 25px;
  border: 1px solid #a5a4f5;
  border-radius: 20px;
}

.peers-text:focus {
  outline: none;
  border-color: rgb(124, 124, 241);
}

.one-peer {
  width: 100%;
  background-color: #ffffff;
  border-radius: 1.5em;
  padding: 20px 10px;
  margin-top: 20px;
}

.peers-pic {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  /*float: left;*/
  left: -15px;
  top: -25px;
}

.peer-info {
  font-size: 25px;
  color: #6564b7;
  margin-left: 75px;
  margin-top: -82px;
}

.choose {
  font-family: "Gotham Pro light", serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #a6a6ef;
  border: none;
  color: white;
  padding: 7px 25px;
  text-decoration: none;
  float: right;
  margin-top: -30px;
  font-size: 18px;
  cursor: pointer;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.choose:hover {
  background-color: rgb(120, 120, 241);
  transition: 0.25s;
  cursor: pointer;
}

.choose:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

/* Отображение пиров на странице */

.peer-sel {
  width: 90%;
  background-color: #ececf2;
  border-radius: 1em;
  padding: 20px 10px;
  margin: 20px auto auto;
  align-content: center;
}

.peer-sel .close {
  margin-top: -32px;
  width: 35px;
  float: right;
  font-size: 1.7em;
  color: #f00;
  cursor: pointer;
}

.avatar {
  width: 100%;
}
</style>
