import { types } from "@/types";
import { refreshToken, getNewToken, registerUser } from "@/services/auth";
import {
  approveWorker,
  getAllPeers,
  getMyPeers,
  getMyTeam,
  getUserPeers,
  removeMyPeer,
  saveMyPeer,
} from "@/services/peers";
import Cockies from "vue-cookies";
import router from "@/router";
import {
  getRates,
  getSelfReview,
  getUserReviewIsDraft,
  saveSelfReview,
} from "@/services/basic";

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

  async getMyTeam({ commit }) {
    try {
      const team = await getMyTeam();
      if (!team.error) commit(types.SET_TEAM, team);
    } catch (e) {
      console.log(e);
    }
  },

  async getAllPeers({ commit, state }, isManager) {
    try {
      console.log(isManager);
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
      const localContent = localStorage.getItem("selfReviewForm");
      let contentSelfReview;

      if (!localContent) {
        contentSelfReview = await getSelfReview();
        localStorage.setItem(
          "selfReviewForm",
          JSON.stringify(contentSelfReview)
        );
      } else {
        contentSelfReview = JSON.parse(localStorage.getItem("selfReviewForm"));
      }

      commit(types.SET_SELFREVIEW, contentSelfReview);
    } catch (e) {
      console.log(e);
    }
  },

  async saveSelfReview({ commit }, payload) {
    try {
      localStorage.setItem("selfReviewForm", JSON.stringify(payload));
      await saveSelfReview(payload);
    } catch (e) {
      console.log(e);
    }
  },

  async getIsApproval({ commit, state, dispatch }) {
    try {
      // const userRates = await getRates(id);
      // console.log("Оценки определенного пользователя:", userRates);
      if (state.user.team.length === 0) {
        await dispatch("getMyTeam");
      }

      state.user.team.map(async (worker) => {
        let isDraft = await getUserReviewIsDraft(worker.profile_id);

        if (isDraft.is_draft && !worker.approve)
          commit(types.SET_TEAM_WITHOUT_REVIEW, worker);
        else if (!isDraft.is_draft && worker.approve)
          commit(types.SET_TEAM_APPROVE, worker);
        else {
          const userPeers = await getUserPeers(worker.profile_id);
          commit(types.SET_WORKER_PEERS, {
            id: worker.profile_id,
            peers: userPeers,
          });
          commit(types.SET_TEAM_WITH_REVIEW, worker);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },

  async approveWorker({ state, commit }, id) {
    try {
      await approveWorker(id);
      const addUser = state.user.teamWithReview.find(
        (user) => user.profile_id === id
      );

      state.user.teamWithReview = state.user.teamWithReview.filter(
        (user) => user.profile_id !== id
      );

      commit(types.SET_TEAM_APPROVE, addUser);
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
