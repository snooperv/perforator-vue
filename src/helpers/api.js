const API_URL = "http://localhost:8000";
const AUTH = API_URL + "/api/token";
const PEERS = API_URL + "/perforator/peers";

export const refreshTokenAPI = () => AUTH + "/refresh/";
export const getNewTokenAPI = () => AUTH + "/";

export const getMyPeersAPI = () => PEERS + "/my/";
