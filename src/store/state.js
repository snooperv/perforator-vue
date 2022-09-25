import Cockies from "vue-cookies";

const state = {
  cookieToken: Cockies.get("refresh_token"),
  user: {
    token: localStorage.getItem("token") || null,
    authError: false,
    peers: [],
  },
};

export default state;
