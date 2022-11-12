const API_URL = "http://localhost:8000";
const AUTH = API_URL + "/api/token/";
const MAIN_API = API_URL + "/perforator/";
const PEERS = MAIN_API + "peers/";
const SELF_REVIEW = MAIN_API + "self-review/";

export const refreshTokenAPI = () => AUTH + "refresh/";
export const getNewTokenAPI = () => AUTH;
export const registerUserAPI = () => MAIN_API + "registration/";

export const getMyPeersAPI = () => PEERS + "my/";

export const getSelfReviewAPI = () => SELF_REVIEW;
export const saveSelfReviewAPI = () => SELF_REVIEW + "save/";
