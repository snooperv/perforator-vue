import Cockies from "vue-cookies";

const state = {
  cookieToken: Cockies.get("refresh_token"),
  user: {
    username: "",
    phone: "",
    sbis: "",
    token: localStorage.getItem("token") || null,
    authError: false,
    peers: [],
    team: [],
  },
  peersAll: [],
  selfReview: {},
};

export default state;
