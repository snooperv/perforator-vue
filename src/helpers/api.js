const API_URL = "http://localhost:8000";
const AUTH = API_URL + "/api/token";
const MAIN_API = API_URL + "/perforator";
const PEERS = MAIN_API + "/peers";

export const refreshTokenAPI = () => AUTH + "/refresh/";
export const getNewTokenAPI = () => AUTH + "/";

export const getMyPeersAPI = () => PEERS + "/my/";
