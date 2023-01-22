<template>
  <div class="selection-mobile" v-if="isMobile">
    <div class="draggable-block" @mousedown="dragStart" @touchstart="dragStart">
      <div class="draggable-line"></div>
    </div>
    <h3>Выберите {{ isAllUsers ? "сотрудника" : "оценивающего" }}</h3>
    <input
      type="text"
      v-model="search"
      class="peers-text"
      placeholder="Введите имя"
    />
    <div id="list_peers">
      <div
        v-for="peer in searchPeers"
        :id="'peer-' + peer.profile_id"
        :key="peer.profile_id"
        style="margin: 0 0 0 5px"
      >
        <div class="one-peer" v-if="peer.username !== 'Админ'">
          <div class="peers-pic">
            <img class="avatar" :src="API_URL() + peer.photo" alt="Avatar" />
          </div>
          <div class="peer-info">{{ peer.username }}</div>
          <button class="choose" @click="selectPeerRemote(peer.profile_id)">
            Выбрать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { closeModal } from "jenesius-vue-modal";
import { API_URL } from "@/helpers/api";
import { dragStart } from "@/helpers/dragMethodsBottom";

export default {
  name: "peersListMobile",

  props: ["isManager", "workerId", "isAllUsers"],

  data() {
    return {
      search: "",
    };
  },

  computed: {
    ...mapState(["peersAll", "isMobile", "usersAll"]),

    searchPeers: function () {
      const search = this.search.toLowerCase();
      const users = this.isAllUsers ? this.usersAll : this.peersAll;
      if (search) {
        return users.filter((option) =>
          option.username.toLowerCase().includes(search)
        );
      }
      return users;
    },

    closeModalPeers() {
      closeModal();
    },
  },

  mounted() {
    if (this.isAllUsers) {
      this.$store.dispatch("getAllUsers");
    } else {
      this.$store.dispatch("getAllPeers", {
        isManager: this.isManager,
        workerId: this.workerId,
      });
    }
  },

  methods: {
    dragStart,
    API_URL() {
      return API_URL;
    },
    selectPeerRemote(id) {
      if (this.isAllUsers) {
        this.$store.dispatch("addUserImMyTeam", id);
      } else {
        this.$store.dispatch("addMyPeer", {
          peerId: id,
          isManager: this.isManager,
          workerId: this.workerId,
        });
      }
    },
  },
};
</script>

<style lang="scss" src="./peersList.scss" scoped></style>
