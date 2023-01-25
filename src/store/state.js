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
    averageScore: {},
    teamWithoutReview: [],
    teamWithReview: [],
    teamApprove: [],
  },
  usersAll: [],
  workerPeers: {},
  peersAll: [],
  selfReview: {},
  isMobile: window.innerWidth <= 800,
  prStatus: null,
  listReviews: [],
  data: [],
  scores: [],
  rateComment: [],
};

export default state;
