import Cockies from "vue-cookies";

const state = {
  cookieToken: Cockies.get("token_b"),
  user: {
    username: "",
    phone: "",
    sbis: "",
    token: localStorage.getItem("token") || null,
    authError: false,
    peers: [],
    team: [],
    teamWithoutReview: [],
    teamWithReview: [],
    teamApprove: [],
  },
  workerPeers: {},
  peersAll: [],
  selfReview: {},
};

export default state;
