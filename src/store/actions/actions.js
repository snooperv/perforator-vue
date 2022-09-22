import axios from "axios";
import { types } from "@/types";
import { refreshToken, getNewToken } from "@/services/auth";
import { getMyPeers } from "@/services/peers";
import Cockies from "vue-cookies";
import router from "@/router";

const actions = {
  async startApp({ commit }, { cookieToken }) {
    try {
      const token = await refreshToken({ refresh: cookieToken });
      localStorage.token = token.access;
    } catch (e) {
      console.log(e);
    }
  },

  async getToken({ commit }, { username, password }) {
    try {
      const token = await getNewToken({
        username,
        password,
      });

      Cockies.set("refresh_token", token.refresh, "1y");
      localStorage.token = token.access;

      commit("SET_AUTH", { token: token.access, error: false });

      console.log("Успешная авторизация");

      router.push("/");
    } catch (e) {
      console.log(e.message);
      commit("SET_AUTH", { error: "Неверный логин или пароль" });
    }
  },

  async getMyPeers({ commit }) {
    try {
      console.log("Получение пиров");
      const test = await getMyPeers();
      commit(types.SET_PEERS, test);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
