import { types } from "@/types";
import { API_URL } from "@/helpers/api";

const mutations = {
  [types.SET_IS_LOADING](state, payload) {
    const existsLoadingStatuses = state.isLoading;
    state.isLoading = { ...existsLoadingStatuses, ...payload };
  },

  [types.SET_IS_LOADING_SIDEBAR](state, payload) {
    const existsLoadingStatuses = state.isLoadingSidebar;
    state.isLoadingSidebar = { ...existsLoadingStatuses, ...payload };
  },

  [types.CLEAR_lOCALSTORGE]() {
    localStorage.removeItem("token");
    localStorage.removeItem("lifetimeToken");
    localStorage.removeItem("selfReviewForm");
    localStorage.removeItem("isManager");
  },

  [types.SET_AUTH](state, payload) {
    const { token, error } = payload;
    state.user.token = token;
    state.user.authError = error;
  },

  [types.SET_MY_PROFILE](state, payload) {
    const { name, phone, sbis, photo, id, team_id } = payload;
    state.user.username = name;
    state.user.phone = phone;
    state.user.sbis = sbis;
    state.user.photo = API_URL + photo;
    state.user.myId = id;
    state.user.teamId = team_id;
  },

  [types.CLEAR_AUTH_ERRORS](state) {
    state.user.authError = false;
  },

  [types.SET_PEERS](state, peers) {
    state.user.peers = peers;
  },

  [types.SET_TEAM](state, team) {
    state.user.team = team;
    state.user.team.map((worker) => (worker.isDropdown = false));
    team.length > 0 && localStorage.setItem("isManager", "true");
  },

  [types.SET_ALL_USERS](state, users) {
    state.usersAll = users;
  },

  [types.SET_MANAGER_STATUS](state, status) {
    state.user.statusManager = status === "True";
    status === "True" && localStorage.setItem("isManager", "true");
  },

  [types.SET_MY_MANAGER](state, manager) {
    state.user.manager = [manager];
  },

  [types.DELETE_USER_TEAM](state, manager) {
    state.user.teamWithoutReview = [];
    state.user.teamWithReview = [];
    state.user.teamApprove = [];
  },

  [types.SET_TEAM_WITHOUT_REVIEW](state, user) {
    user.isDropdown = false;
    const isOld = state.user.teamWithoutReview.filter(
      (inTeam) => inTeam.profile_id === user.profile_id
    ).length;
    !isOld && state.user.teamWithoutReview.push(user);
  },

  [types.SET_TEAM_WITH_REVIEW](state, user) {
    const isOld = state.user.teamWithReview.filter(
      (inTeam) => inTeam.profile_id === user.profile_id
    ).length;
    !isOld && state.user.teamWithReview.push(user);
  },

  [types.SET_TEAM_APPROVE](state, user) {
    const isOld = state.user.teamApprove.filter(
      (inTeam) => inTeam.profile_id === user.profile_id
    ).length;
    !isOld && state.user.teamApprove.push(user);
  },

  [types.SET_WORKER_PEERS](state, payload) {
    state.workerPeers[payload.id] = payload.peers;
  },

  [types.SET_PEERS_ALL](state, peers) {
    state.peersAll = peers;
  },

  [types.ADD_MY_PEER](state, peer) {
    state.user.peers.push(peer);
    state.user.peers.sort(peersSort);
  },

  [types.ADD_WORKER_PEER](state, payload) {
    state.workerPeers[payload.workerId].push(payload.peer);
    state.workerPeers[payload.workerId].sort(peersSort);
  },

  [types.ADD_PEER_All](state, peer) {
    state.peersAll.push(peer);
    state.peersAll.sort(peersSort);
  },

  [types.SET_SELFREVIEW](state, payload) {
    state.selfReview = payload;
  },

  [types.SET_PEERS_RATED_ME](state, payload) {
    state.user.peersIRate = payload;
    state.user.peersIRate.map?.((peer) => (peer.isOpen = false));
  },

  [types.SET_WORKER_SCORE](state, payload) {
    const { id, score } = payload;
    if (state.user.statusManager)
      state.user.team.filter(
        (worker) => (worker.profile_id || worker.myId) === id
      )[0].rating = score;
    else state.user.team = { rating: score };
  },

  [types.SET_GENERAL_SCORE](state, payload) {
    state.user.team.generalRating = {};
    payload.forEach((rating) => {
      state.user.team.generalRating[rating.name] = rating.mark;
    });
  },

  [types.SET_PR_STATUS](state, payload) {
    state.prStatus = payload;
  },

  [types.SET_LIST_REVIEWS](state, payload) {
    state.listReviews = payload;
  },

  [types.SET_SCORE_BEFORE_UNMOUNT](state, payload) {
    state.data.previousPeriod = payload.previousPeriod;
  },

  [types.CLEAR_DATA](state) {
    state.data = [];
  },

  [types.CLEAR_SELF_REVIEW](state) {
    state.selfReview = {};
  },

  [types.SET_RATE_COMMENT](state, payload) {
    state.rateComment = payload;
  },
};

const peersSort = (peer1, peer2) => {
  if (peer1.profile_id > peer2.profile_id) {
    return 1;
  }
  if (peer1.profile_id < peer2.profile_id) {
    return -1;
  }
  return 0;
};

export default mutations;
