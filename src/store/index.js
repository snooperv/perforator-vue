import { createStore } from "vuex";
import actions from "./actions/actions";
import state from "./state";
import mutations from "./mutations";

export default createStore({
  state,
  getters: {
    cookieToken: (state) => state.cookieToken,
  },
  mutations,
  actions,
  modules: {},
});
