import axios from "axios";
import { types } from "../../types";
import { refreshToken, getNewToken } from "../../services/auth";
import { getMyPeers } from "../../services/peers";
import Cockies from "vue-cookies";

const actions = {
  async startApp({ commit }, { cookieToken }) {
    try {
      const token = await refreshToken({ refresh: cookieToken });
      localStorage.token = token.access;
    } catch (e) {
      console.log(e);
    }
  },

  async getToken({ commit, $cookies }) {
    try {
      const token = await getNewToken({
        username: "+79876543211",
        password: "123",
      });

      Cockies.set("refresh_token", token.refresh, "1y");
      localStorage.token = token.access;

      console.log("Получен новый токен");
    } catch (e) {
      console.log(e);
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
