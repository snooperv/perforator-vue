import { types } from "@/types";
import { refreshToken, getNewToken, registerUser } from "@/services/auth";
import {
  addWorkerPeer,
  approveWorker,
  getAllPeers,
  getMyManager,
  getMyPeers,
  getMyTeam,
  getOneToOneCommon,
  getOneToOnePrivate,
  getPeersRatedMe,
  getTeamScores,
  getUserPeers,
  postPeersRatedMe,
  postProcessOneToOneCommon,
  postProcessOneToOnePrivate,
  removeMyPeer,
  removeWorkerPeer,
  saveMyPeer,
} from "@/services/peers";
import Cockies from "vue-cookies";
import router from "@/router";
import {
  getMyProfile,
  getRates,
  getSelfReview,
  getUserReviewIsDraft,
  saveSelfReview,
} from "@/services/basic";
import grades from "@/helpers/grades";

const actions = {
  async refreshAuthToken({ commit, getters, state }) {
    try {
      const cookieToken = getters.cookieToken;
      const lifetimeToken = localStorage.lifetimeToken;
      if (lifetimeToken) {
        const dateToken = new Date(lifetimeToken);
        if (
          Date.now() >=
          dateToken.getTime() + dateToken.getTimezoneOffset() * 60 * 1000
        ) {
          const token = await refreshToken();
          localStorage.token = token.token;
          localStorage.lifetimeToken = token.lifetime;
        }

        if (!state.user.token)
          commit("SET_AUTH", { token: localStorage.token, error: false });
      }
    } catch (e) {
      console.log(e);
      localStorage.token = "";
      await router.push("/login");
    }
  },

  async getToken({ commit }, { username, password }) {
    try {
      const token = await getNewToken({
        user: {
          id: username,
          password,
        },
      });

      // Cockies.set("refresh_token", token.token_b, "7d");
      localStorage.token = token.token_f;
      localStorage.lifetimeToken = token.token_f_lifetime;

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
      //commit("SET_AUTH", { error: "???????????????? ?????????? ?????? ????????????" });
    }
  },

  async getMyProfile({ commit }) {
    try {
      const profile = await getMyProfile();
      commit("SET_MY_PROFILE", profile);
    } catch (e) {
      console.log(e);
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
      // console.log("???????????? ?????????????????????????? ????????????????????????:", userRates);
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

  async getOneToOne({ commit }, payload) {
    const { is_manager, manager_id, employee_id } = payload;
    try {
      const commonNote = await getOneToOneCommon({
        manager_id,
        employee_id,
      });

      const privateNote = await getOneToOnePrivate({
        is_manager,
        manager_id,
        employee_id,
      });

      return { commonNote: commonNote.notes, privateNote: privateNote.notes };
    } catch (e) {
      console.log(e);
    }
  },

  async postProcessOneToOne({}, payload) {
    const { is_manager, manager_id, employee_id, personalNote, commonNote } =
      payload;
    try {
      await postProcessOneToOneCommon({
        manager_id,
        employee_id,
        note: commonNote,
      });

      await postProcessOneToOnePrivate({
        is_manager,
        manager_id,
        employee_id,
        note: personalNote,
      });
    } catch (e) {
      console.log(e);
    }
  },

  async postProcessOneToOnePrivate({}, payload) {
    const { is_manager, manager_id, employee_id, note } = payload;
    try {
    } catch (e) {
      console.log(e);
    }
  },

  async getPeersRatedMe({ commit }) {
    try {
      const peers = await getPeersRatedMe();
      commit("SET_PEERS_RATED_ME", peers.rated);
    } catch (e) {
      console.log(e);
    }
  },

  async postPeersRatedMe({ commit }, form) {
    try {
      await postPeersRatedMe(form);
    } catch (e) {
      console.log(e);
    }
  },

  async getTeamScores({ commit }, team) {
    try {
      const averagesTeam = Object.assign({}, grades);
      let countAverages = 0;

      const calcAverage = (dict) => {
        let result = 0,
          count = 0;
        for (let item of Object.values(dict)) {
          count++;
          result += item;
        }
        return +(result / count).toFixed(2);
      };

      for (let worker of team) {
        const workerScore = await getTeamScores(`?id=${worker.profile_id}`);

        const finalRating = {
          manager: Object.assign({}, grades),
          peers: Object.assign({}, grades),
          averages: Object.assign({}, grades),
        };

        if (workerScore[0].rates.length > 0) {
          let countPeers = 0;

          workerScore[0].rates.map((scores) => {
            let result = {
              deadline: scores.r_deadline,
              approaches: scores.r_approaches,
              teamwork: scores.r_teamwork,
              practices: scores.r_practices,
              experience: scores.r_experience,
              adaptation: scores.r_adaptation,
            };
            if (scores.is_manager) {
              result.average = calcAverage(result);
              finalRating.manager = result;
            } else {
              countPeers++;
              for (let score in finalRating.peers) {
                finalRating.peers[score] += result[score];
              }
              delete finalRating.peers.average;
            }

            for (let score in averagesTeam) {
              averagesTeam[score] += result[score];
              averagesTeam.average && delete averagesTeam.average;
            }
            countAverages++;
          });

          if (countPeers) {
            for (let score in finalRating.peers) {
              finalRating.peers[score] = +(
                finalRating.peers[score] / countPeers
              ).toFixed(2);
            }
            finalRating.peers.average = calcAverage(finalRating.peers);
          }

          for (let score in finalRating.averages) {
            finalRating.averages[score] = +(
              (finalRating.peers[score] + finalRating.manager[score]) /
              2
            ).toFixed(2);
          }
          finalRating.averages.average = calcAverage(finalRating.averages);
        }

        commit("SET_WORKER_SCORE", {
          id: workerScore[0].user_id,
          score: finalRating,
        });
      }

      for (let score in averagesTeam) {
        averagesTeam[score] = +(averagesTeam[score] / countAverages).toFixed(2);
      }
      averagesTeam.average = calcAverage(averagesTeam);
      commit("SET_GENERAL_SCORE", averagesTeam);
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
