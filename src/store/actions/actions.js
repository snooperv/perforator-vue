import { types } from "@/types";
import { refreshToken, getNewToken, registerUser } from "@/services/auth";
import {
  addWorkerPeer,
  approveWorker,
  getAllPeers,
  getMyManager,
  getMyPeers,
  getMyTeam,
  getUserPeers,
  postProcessOneToOne,
  removeMyPeer,
  removeWorkerPeer,
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

  async getAllPeers({ commit, state }, payload) {
    try {
      const { isManager, workerId } = payload;
      let peers = await getAllPeers();

      if (!isManager && state.user.peers) {
        peers = filterPeers(peers, state.user.peers);
      } else if (state.workerPeers[workerId]) {
        peers = filterPeers(peers, state.workerPeers[workerId]).filter(
          (peer) => peer.profile_id !== workerId
        );
      }

      if (!peers.error) commit(types.SET_PEERS_ALL, peers);
    } catch (e) {
      console.log(e);
    }
  },

  async addMyPeer({ commit, state }, payload) {
    try {
      const { peerId, isManager, workerId } = payload;
      const peer = state.peersAll.find((peer) => peer.profile_id === peerId);
      const availablePeers = state.peersAll.filter(
        (peer) => peer.profile_id !== peerId
      );

      commit(types.SET_PEERS_ALL, availablePeers);
      if (!isManager) {
        commit(types.ADD_MY_PEER, peer);
        await saveMyPeer(peerId);
      } else {
        commit(types.ADD_WORKER_PEER, { peer, workerId });
        await addWorkerPeer(workerId, peerId);
      }
    } catch (e) {
      console.log(e);
    }
  },

  async removeMyPeer({ commit, state }, id) {
    try {
      const availablePeers = state.user.peers.filter(
        (peer) => peer.profile_id !== id
      );
      commit(types.SET_PEERS, availablePeers);
      await removeMyPeer(id);
    } catch (e) {
      console.log(e);
    }
  },

  async removeWorkerPeer({ commit, state }, payload) {
    try {
      const { workerId, peerId } = payload;
      const availablePeers = state.workerPeers[workerId].filter(
        (peer) => peer.profile_id !== peerId
      );
      commit(types.SET_WORKER_PEERS, {
        id: workerId,
        peers: availablePeers,
      });
      await removeWorkerPeer(workerId, peerId);
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

  async getMyManager({ commit }, id) {
    try {
      const manager = await getMyManager();
      commit(types.SET_MY_MANAGER, manager);
    } catch (e) {
      console.log(e);
    }
  },

  async postProcessOneToOne({}, payload) {
    const { common, personal, isManager, workerId } = payload;
    await postProcessOneToOne({
      common,
      personal,
      interviewed: workerId,
      is_manager: isManager,
    });
    try {
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
