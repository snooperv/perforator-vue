<template>
  <div id="myDropdown3" class="dropdown-content">
    <div class="dropdown-container" id="my_peers">
      <div class="dropdown-description">пиры, которых выбрал сотрудник</div>

      <div
        class="selected-peer"
        style="display: block"
        v-for="peer in workerPeers[id]"
      >
        <img
          class="selected-peer-avatar"
          src="@/assets/img/pic.png"
          alt="Аватар"
        />
        <div class="selected-peer-name">
          {{ peer.username }}
        </div>
        <a class="close delete-peer" @click="removePeer(id, peer.profile_id)">
          <i class="fas fa-times" aria-hidden="true"></i>
        </a>
      </div>

      <div>
        <button class="add-peer" @click="openModalPeers">
          <i class="icon-plus fas fa-plus" aria-hidden="true"></i>
          Добавить пира
        </button>

        <input
          class="accept"
          type="submit"
          value="утвердить"
          @click="approveUser(id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal";
import PeersList from "@/components/modals/PeersList";
import { mapState } from "vuex";

export default {
  name: "DropdownPeers",

  props: ["id"],

  computed: {
    ...mapState(["workerPeers"]),

    openModalPeers() {
      openModal(PeersList, { isManager: true, workerId: this.id });
    },
  },

  methods: {
    removePeer(workerId, peerId) {
      console.log(workerId, peerId);
      this.$store.dispatch("removeWorkerPeer", { workerId, peerId });
    },

    approveUser(id) {
      this.$store.dispatch("approveWorker", id);
    },
  },
};
</script>

<style scoped>
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

.selected-peer-name {
  font-size: 22px;
  margin-top: -60px;
  margin-left: 50px;
  color: #2c286d;
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

.dropdown-content {
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
</style>
