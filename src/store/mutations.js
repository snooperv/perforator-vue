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
