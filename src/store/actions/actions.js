import axios from "axios";
import { types } from "@/types";
import { refreshToken, getNewToken } from "@/services/auth";
import { getMyPeers } from "@/services/peers";
import Cockies from "vue-cookies";
import router from "@/router";

const actions = {
  async refreshAuthToken({ commit, getters }) {
    try {
      const cookieToken = getters.cookieToken;
      const authToken = localStorage.token;
      if (authToken) {
        const timeToken = JSON.parse(atob(authToken.split(".")[1])).exp;
        console.log(timeToken);
        console.log(Date.now());
        console.log(timeToken * 1000);

        if (Date.now() >= timeToken * 1000) {
          console.log("Обновление токена");
          const token = await refreshToken({ refresh: cookieToken });
          localStorage.token = token.access;
        }

        commit("SET_AUTH", { token: localStorage.token, error: false });
      }
    } catch (e) {
      console.log(e);
      router.push("/login");
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