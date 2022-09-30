import axios from "axios";
import { types } from "@/types";
import { refreshToken, getNewToken, registerUser } from "@/services/auth";
import { getMyPeers } from "@/services/peers";
import Cockies from "vue-cookies";
import router from "@/router";

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

  async userLogout({ commit }) {
    try {
      Cockies.remove("refresh_token");
      localStorage.removeItem("token");
      await router.push("/login");
    } catch (e) {
      console.log(e.message);
    }
  },

  async getMyPeers({ commit }) {
    try {
      const peers = await getMyPeers();
      commit(types.SET_PEERS, peers);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
