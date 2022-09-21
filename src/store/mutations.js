import { types } from "../types";

const mutations = {
  [types.SET_PEERS](state, peers) {
    state.user.peers = peers;
  },
};

export default mutations;
