import { types } from "@/types";
import { refreshToken, getNewToken, registerUser } from "@/services/auth";
import {
  getAllPeers,
  getMyPeers,
  removeMyPeer,
  saveMyPeer,
} from "@/services/peers";
import Cockies from "vue-cookies";
import router from "@/router";
import { getSelfReview, saveSelfReview } from "@/services/main";
import { toRaw } from "vue";

const actions = {
  async refreshAuthToken({ commit, getters, state }) {
    try {
      const cookieToken = getters.cookieToken;
      const authToken = localStorage.token;
      if (authToken) {
        const timeToken = JSON.parse(atob(authToken.split(".")[1])).exp;

        if (Date.now() >= timeToken * 1000) {
          const token = await refreshToken({ refresh: cookieToken });
          localStorage.token = token.access;
        }

        if (!state.user.token)
          commit("SET_AUTH", { token: localStorage.token, error: false });
      }
    } catch (e) {
      console.log(e);
      await router.push("/login");
    }
  },

  async getToken({ commit }, { username, password }) {
    try {
      const token = await getNewToken({
        username,
        password,
      });

      Cockies.set("refresh_token", token.refresh, "30d");
      localStorage.token = token.access;

      commit("SET_AUTH", { token: token.access, error: false });

      await router.push("/self-review");
    } catch (e) {
      console.log(e.message);
      commit("SET_AUTH", { error: e.message });
    }
  },

  async registerNewUser({ commit, dispatch }, data) {
    try {
      const [username, password] = [data.get("phone"), data.get("password")];
      await registerUser(data);
      dispatch("getToken", { username, password });
      await router.push("/self-review");
    } catch (e) {
      console.log(e.message);
      //commit("SET_AUTH", { error: "Неверный логин или пароль" });
    }
  },

  async getMyPeers({ commit }) {
    try {
      const peers = await getMyPeers();
      if (!peers.error) commit(types.SET_PEERS, peers);
    } catch (e) {
      console.log(e);
    }
  },

  async getAllPeers({ commit, state }) {
    try {
      if (state.peersAll.length === 0) {
        let peers = await getAllPeers();
        if (state.user.peers) peers = filterPeers(peers, state.user.peers);
        if (!peers.error) commit(types.SET_PEERS_ALL, peers);
      }
    } catch (e) {
      console.log(e);
    }
  },

  async addMyPeer({ commit, state }, id) {
    try {
      const peer = state.peersAll.find((peer) => peer.profile_id === id);
      const availablePeers = state.peersAll.filter(
        (peer) => peer.profile_id !== id
      );

      commit(types.SET_PEERS_ALL, availablePeers);
      commit(types.ADD_MY_PEER, peer);

      await saveMyPeer(id);
    } catch (e) {
      console.log(e);
    }
  },

  async removeMyPeer({ commit, state }, id) {
    try {
      const peer = state.user.peers.find((peer) => peer.profile_id === id);
      const availablePeers = state.user.peers.filter(
        (peer) => peer.profile_id !== id
      );

      commit(types.SET_PEERS, availablePeers);
      commit(types.ADD_PEER_All, peer);

      await removeMyPeer(id);
    } catch (e) {
      console.log(e);
    }
  },

  async getSelfReview({ commit }) {
    try {
      const contentSelfReview = await getSelfReview();
      commit(types.SET_SELFREVIEW, contentSelfReview);
    } catch (e) {
      console.log(e);
    }
  },

  async saveSelfReview({ commit }, payload) {
    try {
      await saveSelfReview(payload);
    } catch (e) {
      console.log(e);
    }
  },
};

const filterPeers = (peersAll, myPeers) => {
  return peersAll.filter(
    (peer) =>
      myPeers.filter((myPeer) => myPeer.profile_id === peer.profile_id)
        .length === 0
  );
};

export default actions;
