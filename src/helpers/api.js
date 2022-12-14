import urlQueryParts from "@/helpers/urlQueryParts";

const API_URL = "http://localhost:8000";
const MAIN_API = API_URL + "/perforator/";
const PEERS = MAIN_API + "peers/";
const SELF_REVIEW = MAIN_API + "self-review/";

export const refreshTokenAPI = () => MAIN_API + "api/refresh-token";
export const getNewTokenAPI = () => MAIN_API + "api/login";
export const registerUserAPI = () => MAIN_API + "registration/";
export const getMyProfileAPI = () => MAIN_API + "api/myprofile";
export const getPeersRatedMeAPI = () => MAIN_API + "rate_list";
export const postPeersRatedMeAPI = () => MAIN_API + "process_rate/";

export const getMyPeersAPI = () => PEERS + "my/";
export const getAllPeersAPI = () => PEERS + "all/";
export const saveMyPeerAPI = () => PEERS + "save/";
export const removeMyPeerAPI = () => PEERS + "delete/";
export const getUserPeersAPI = (id) => PEERS + "uid" + urlQueryParts(id);
export const addWorkerPeerAPI = (id) => PEERS + "save/user" + urlQueryParts(id);
export const removeWorkerPeerAPI = (id) =>
  PEERS + "delete/user" + urlQueryParts(id);
export const approveWorkerAPI = (id) => PEERS + "approve" + urlQueryParts(id);

export const getSelfReviewAPI = () => SELF_REVIEW;
export const saveSelfReviewAPI = () => SELF_REVIEW + "save/";
export const getUserReviewIsDraftAPI = (id) =>
  SELF_REVIEW + "is-draft/" + urlQueryParts(id);

export const getInfoTeamAPI = () => MAIN_API + "team";
export const getRatesAPI = (id) =>
  MAIN_API + "imanager/employee/rating" + urlQueryParts(id);
export const getMyManagerAPI = () => MAIN_API + "manager";
export const getTeamScoresAPI = (params) =>
  MAIN_API + "imanager/employee/rating" + params;

export const postProcessOneToOneCommonAPI = () =>
  MAIN_API + "1to1/update_common_notes/";
export const postProcessOneToOnePrivateAPI = () =>
  MAIN_API + "1to1/update_private_notes/";
export const getOneToOneCommonAPI = () => MAIN_API + "1to1/get_common_notes/";
export const getOneToOnePrivateAPI = () => MAIN_API + "1to1/get_private_notes/";
