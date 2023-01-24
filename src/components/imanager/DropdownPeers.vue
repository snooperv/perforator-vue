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
          :src="API_URL() + peer.photo"
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
import PeersList from "@/components/modals/PeersList/PeersList.vue";
import { mapState } from "vuex";
import { API_URL } from "@/helpers/api";
import PeersListMobile from "@/components/modals/PeersList/peersListMobile.vue";

export default {
  name: "DropdownPeers",

  props: ["id"],

  computed: {
    ...mapState(["workerPeers", "isMobile"]),

    openModalPeers() {
      this.isMobile
        ? openModal(PeersListMobile, { isManager: true, workerId: this.id })
        : openModal(PeersList, { isManager: true, workerId: this.id });
    },
  },

  methods: {
    API_URL() {
      return API_URL;
    },
    removePeer(workerId, peerId) {
      this.$store.dispatch("removeWorkerPeer", { workerId, peerId });
    },

    approveUser(id) {
      this.$store.dispatch("approveWorker", id);
    },
  },
};
</script>

<style lang="scss" src="./dropdownPeers.scss" scoped></style>
