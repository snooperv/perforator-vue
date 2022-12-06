import { types } from "@/types";

const mutations = {
  [types.SET_AUTH](state, payload) {
    const { token, error } = payload;
    state.user.token = token;
    state.user.authError = error;
  },

  [types.CLEAR_AUTH_ERRORS](state) {
    state.user.authError = false;
  },

  [types.SET_PEERS](state, peers) {
    state.user.peers = peers;
  },

  [types.SET_TEAM](state, team) {
    state.user.team = team;
    team.length > 0 && localStorage.setItem("isManager", "true");
  },

  [types.SET_TEAM_WITHOUT_REVIEW](state, user) {
    user.isDropdown = false;
    !state.user.teamWithoutReview.includes(user) &&
      state.user.teamWithoutReview.push(user);
  },

  [types.SET_TEAM_WITH_REVIEW](state, user) {
    !state.user.teamWithReview.includes(user) &&
      state.user.teamWithReview.push(user);
  },

  [types.SET_TEAM_APPROVE](state, user) {
    !state.user.teamApprove.includes(user) && state.user.teamApprove.push(user);
  },

  [types.SET_WORKER_PEERS](state, payload) {
    state.worker[payload.id] = payload.peers;
    console.log(payload.id, state.worker[payload.id], payload.peers);
  },

  [types.SET_PEERS_ALL](state, peers) {
    state.peersAll = peers;
  },

  [types.ADD_MY_PEER](state, peer) {
    state.user.peers.push(peer);
    // state.user.peers.sort(peersSort);
  },

  [types.ADD_PEER_All](state, peer) {
    state.peersAll.push(peer);
    // state.peersAll.sort(peersSort);
  },

  [types.SET_SELFREVIEW](state, payload) {
    state.selfReview = payload;
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
