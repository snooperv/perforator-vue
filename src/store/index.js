import { createStore } from "vuex";
import actions from "./actions/actions";
import state from "./state";
import mutations from "./mutations";

export default createStore({
  state,
  getters: {},
  mutations,
  actions,
  modules: {},
});
