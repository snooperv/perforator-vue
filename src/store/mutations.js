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

  [types.SET_SELFREVIEW](state, payload) {
    state.selfReview = payload;
  },
};

export default mutations;
