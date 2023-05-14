import { types } from "@/types";
import { getNewToken, refreshToken, registerUser } from "@/services/auth";
import {
  addUserImMyTeam,
  addWorkerPeer,
  approveWorker,
  deleteUserImMyTeam,
  getAllPeers,
  getAllUsers,
  getManagerStatus,
  getMyManager,
  getMyPeers,
  getMyTeam,
  getOneToOneCommon,
  getOneToOnePreviousCommon,
  getOneToOnePreviousPrivate,
  getOneToOnePrivate,
  getPeersRatedMe,
  getRateQuestions,
  getTeamScores,
  getUserPeers,
  getWorkerScore,
  postPeersRatedMe,
  postProcessOneToOneCommon,
  postProcessOneToOnePrivate,
  removeMyPeer,
  removeWorkerPeer,
  saveMyPeer,
  setManagerStatus,
} from "@/services/peers";
import router from "@/router";
import {
  beginPerformanceReview,
  closePerformanceReview,
  getListPerformanceReview,
  getMyProfile,
  getPreviousPeriods,
  getQuestions,
  getReviewEmployee,
  getSelfReview,
  getSelfReviewId,
  getStatusPerformanceReview,
  getUserReviewIsDraft,
  nextStagePerformanceReview,
  saveQuestions,
  saveSelfReview,
  updateQuestions,
} from "@/services/basic";

const actions = {
  async refreshAuthToken({ commit, state }) {
    try {
      commit(types.SET_IS_LOADING, { refreshAuthToken: true });
      const lifetimeToken = localStorage.lifetimeToken;
      if (lifetimeToken) {
        const dateNow = new Date();
        const dateToken = new Date(lifetimeToken);
        if (
          dateNow.getTime() + dateNow.getTimezoneOffset() * 60 * 1000 >=
          dateToken
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
    } finally {
      commit(types.SET_IS_LOADING, { refreshAuthToken: false });
    }
  },

  async getToken({ commit }, { username, password }) {
    try {
      commit(types.SET_IS_LOADING, { getToken: true });
      const token = await getNewToken({
        user: {
          id: username,
          password,
        },
      });

      if (token.status !== "ok") {
        console.log(token.status);
        return;
      }

      localStorage.token = token.token_f;
      localStorage.lifetimeToken = token.token_f_lifetime;

      commit("SET_AUTH", { token: token.access, error: false });

      await router.push("/self-review");
    } catch (e) {
      console.log(e.message);
      commit("SET_AUTH", { error: e.message });
    } finally {
      commit(types.SET_IS_LOADING, { getToken: false });
    }
  },

  async registerNewUser({ commit, dispatch }, data) {
    try {
      commit(types.SET_IS_LOADING, { registerNewUser: true });
      const [username, password] = [data.get("phone"), data.get("password")];
      await registerUser(data);
      await dispatch("getToken", { username, password });
      await router.push("/self-review");
    } catch (e) {
      console.log(e.message);
      //commit("SET_AUTH", { error: "Неверный логин или пароль" });
    } finally {
      commit(types.SET_IS_LOADING, { registerNewUser: false });
    }
  },

  async getMyProfile({ commit }) {
    try {
      commit(types.SET_IS_LOADING_SIDEBAR, { getMyProfile: true });
      const profile = await getMyProfile();
      commit("SET_MY_PROFILE", profile);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING_SIDEBAR, { getMyProfile: false });
    }
  },

  async getMyPeers({ commit }) {
    try {
      commit(types.SET_IS_LOADING, { getMyPeers: true });
      const peers = await getMyPeers();
      if (!peers.error) commit(types.SET_PEERS, peers);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getMyPeers: false });
    }
  },

  async getManagerStatus({ commit }, id) {
    try {
      commit(types.SET_IS_LOADING_SIDEBAR, { getManagerStatus: true });
      const status = await getManagerStatus({ profile_id: id });
      commit(types.SET_MANAGER_STATUS, status.is_manager);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING_SIDEBAR, { getManagerStatus: false });
    }
  },

  async setManagerStatus() {
    try {
      await setManagerStatus();
    } catch (e) {
      console.log(e);
    }
  },

  async getAllUsers({ commit, state }) {
    try {
      const users = await getAllUsers();
      const usersWithoutMe = users.users.filter(
        (user) => user.profile_id !== state.user.myId
      );
      const team = await getMyTeam();
      if (!team.error) commit(types.SET_TEAM, team);
      const usersWithoutTeam = usersWithoutMe.filter(
        (user) => !user.team_id && !user.is_manager
      );
      commit(types.SET_ALL_USERS, usersWithoutTeam);
    } catch (e) {
      console.log(e);
    }
  },

  async addUserImMyTeam({ commit, state, dispatch }, id) {
    try {
      await addUserImMyTeam({ profile_id: id });
      await dispatch("getAllUsers");
    } catch (e) {
      console.log(e);
    }
  },

  async deleteUserImMyTeam({ commit, state, dispatch }, id) {
    try {
      await deleteUserImMyTeam({ profile_id: id });
      commit(types.DELETE_USER_TEAM);
      const team = await getMyTeam();
      if (!team.error) commit(types.SET_TEAM, team);
    } catch (e) {
      console.log(e);
    }
  },

  async getMyTeam({ commit, state }) {
    try {
      if (!state.isLoading.getMyTeam) {
        commit(types.SET_IS_LOADING, { getMyTeam: true });
        console.log(state.isLoading.getMyTeam);

        const team = await getMyTeam();
        if (!team.error) commit(types.SET_TEAM, team);
      }
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getMyTeam: false });
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

  async getSelfReview({ commit, state }, payload) {
    try {
      commit(types.SET_IS_LOADING, { getSelfReview: true });
      const { id } = payload;
      let contentSelfReview;
      if (id) contentSelfReview = await getSelfReviewId({ pr_id: id });
      else contentSelfReview = await getSelfReview();
      commit(types.SET_SELFREVIEW, contentSelfReview);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getSelfReview: false });
    }
  },

  async getReviewEmployee({ commit, state }, payload) {
    try {
      const { evaluatedPerson, prId } = payload;
      console.log(state.user.myId);
      const review = await getReviewEmployee({
        appraising_person: 1,
        evaluated_person: evaluatedPerson,
        pr_id: prId,
        face: state.user.myId,
      });
      commit(types.SET_RATE_COMMENT, review);
    } catch (e) {
      console.log(e);
    }
  },

  async saveSelfReview({ commit }, payload) {
    try {
      await saveSelfReview(payload);
      // localStorage.setItem("selfReviewForm", JSON.stringify(payload));
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  async getIsApproval({ commit, state, dispatch }) {
    try {
      commit(types.SET_IS_LOADING, { getIsApproval: true });
      if (state.user.team.length === 0) {
        await dispatch("getMyTeam");
      }

      state.user.team.map(async (worker) => {
        try {
          commit(types.SET_IS_LOADING, { getIsApprovalContent: true });
          let isDraft = await getUserReviewIsDraft(worker.profile_id);

          if (
            isDraft.status === "Review не найдено" ||
            (isDraft.is_draft && !worker.approve)
          )
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
        } catch (e) {
          console.log(e);
        } finally {
          commit(types.SET_IS_LOADING, { getIsApprovalContent: false });
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getIsApproval: false });
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

  async getMyManager({ commit }) {
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

  async getPeersRatedMe({ commit }) {
    try {
      commit(types.SET_IS_LOADING, { getPeersRatedMe: true });
      const peers = await getPeersRatedMe();
      commit("SET_PEERS_RATED_ME", peers.rated);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getPeersRatedMe: false });
    }
  },

  async getRateQuestions({ commit }, data) {
    try {
      const questions = await getRateQuestions(data);
      return questions.grades;
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

  async getPreviousPeriods({ commit }, payload) {
    try {
      commit(types.SET_IS_LOADING, { getPreviousPeriods: true });
      const { id, date } = payload;
      const previous = await getPreviousPeriods({ id });
      return previous.rp.filter((prev) => prev.closing_date === date)[0].pr_id;
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getPreviousPeriods: false });
    }
  },

  async getTeamScores({ commit }, period) {
    try {
      commit(types.SET_IS_LOADING, { getTeamScores: true });

      const teamScore = await getTeamScores({ id: period });
      if (teamScore.status === "ok") {
        commit("SET_GENERAL_SCORE", teamScore.rating);
      }
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getTeamScores: false });
    }
  },

  async getUserScores({ commit }, user) {
    try {
      commit(types.SET_IS_LOADING, { getUserScores: true });
      let workersScore;
      if (user.pr_id !== -1)
        workersScore = await getWorkerScore({
          id: user.user_id || user.myId,
          pr_id: user.pr_id,
        });
      if (workersScore && workersScore.status === "ok") {
        const average = (workersScore.rating?.filter(
          (score) => score.name === "Средняя оценка"
        )[0]).average;
        const userRating = {
          detailed: workersScore.rating,
          average,
        };
        commit("SET_WORKER_SCORE", {
          id: user.user_id || user.myId,
          score: userRating,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getUserScores: false });
    }
  },

  async getStatusPerformanceReview({ commit }) {
    try {
      commit(types.SET_IS_LOADING, { getStatusPerformanceReview: true });
      const status = await getStatusPerformanceReview();
      commit(types.SET_PR_STATUS, status);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getStatusPerformanceReview: false });
    }
  },

  async beginPerformanceReview({ dispatch }) {
    try {
      await beginPerformanceReview();
      await dispatch("getStatusPerformanceReview");
    } catch (e) {
      console.log(e);
    }
  },

  async nextStagePerformanceReview({ commit, dispatch }, date) {
    try {
      await nextStagePerformanceReview(date);
      await dispatch("getStatusPerformanceReview");
    } catch (e) {
      console.log(e);
    }
  },

  async closePerformanceReview({ dispatch }) {
    try {
      await closePerformanceReview();
      await dispatch("getStatusPerformanceReview");
    } catch (e) {
      console.log(e);
    }
  },

  async getListPerformanceReview({ commit }) {
    try {
      commit(types.SET_IS_LOADING, { getListPerformanceReview: true });
      const listReviews = await getListPerformanceReview();
      commit(types.SET_LIST_REVIEWS, listReviews.rp);
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getListPerformanceReview: false });
    }
  },

  async getOneToOnePrevious({ commit }, payload) {
    const { is_manager, manager_id, employee_id, pr_id } = payload;
    try {
      commit(types.SET_IS_LOADING, { getOneToOnePrevious: true });
      const commonNote = await getOneToOnePreviousCommon({
        pr_id,
        manager_id,
        employee_id,
      });

      const privateNote = await getOneToOnePreviousPrivate({
        pr_id,
        is_manager,
        manager_id,
        employee_id,
      });

      return { commonNote: commonNote.notes, privateNote: privateNote.notes };
    } catch (e) {
      console.log(e);
    } finally {
      commit(types.SET_IS_LOADING, { getOneToOnePrevious: false });
    }
  },

  async getQuestions({ commit }, data) {
    try {
      const questions = await getQuestions(data);
      if (questions.status === "ok")
        return questions.questions.map((question) => {
          return { title: question.name, description: question.description };
        });
      else return null;
    } catch (e) {
      console.log(e);
    }
  },

  async saveQuestions({ commit }, data) {
    try {
      const { isNew, payload } = data;
      if (isNew) {
        const save = await saveQuestions(payload);
        return save.status;
      } else {
        const save = await updateQuestions(payload);
        return save.status;
      }
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
