import request from "../helpers/request";
import {
  addWorkerPeerAPI,
  approveWorkerAPI,
  getAllPeersAPI,
  getAllUsersAPI,
  getInfoTeamAPI,
  getManagerStatusAPI,
  getMyManagerAPI,
  getMyPeersAPI,
  getOneToOneCommonAPI,
  getOneToOnePrivateAPI,
  getPeersRatedMeAPI,
  getTeamScoresAPI,
  getUserPeersAPI,
  postPeersRatedMeAPI,
  postProcessOneToOneCommonAPI,
  postProcessOneToOnePrivateAPI,
  removeMyPeerAPI,
  removeWorkerPeerAPI,
  saveMyPeerAPI,
  setManagerStatusAPI,
} from "@/helpers/api";

export const getMyPeers = async () => {
  return await request(getMyPeersAPI());
};

export const getAllPeers = async () => {
  return await request(getAllPeersAPI());
};

export const saveMyPeer = async (id) => {
  return await request(saveMyPeerAPI(), "POST", id);
};

export const removeMyPeer = async (id) => {
  return await request(removeMyPeerAPI(), "POST", id);
};

export const getMyTeam = async () => {
  return await request(getInfoTeamAPI());
};

export const getManagerStatus = async (id) => {
  return await request(getManagerStatusAPI(), "POST", id);
};

export const setManagerStatus = async () => {
  return await request(setManagerStatusAPI(), "POST");
};

export const getAllUsers = async () => {
  return await request(getAllUsersAPI());
};

export const getMyManager = async () => {
  return await request(getMyManagerAPI());
};

export const getTeamScores = async (params) => {
  return await request(getTeamScoresAPI(params));
};

export const getUserPeers = async (id) => {
  return await request(getUserPeersAPI({ id }));
};

export const addWorkerPeer = async (userId, peerId) => {
  return await request(addWorkerPeerAPI({ id: userId }), "POST", peerId);
};

export const removeWorkerPeer = async (userId, peerId) => {
  return await request(removeWorkerPeerAPI({ id: userId }), "POST", peerId);
};

export const approveWorker = async (id) => {
  return await request(approveWorkerAPI({ id }), "POST");
};

export const getOneToOneCommon = async (data) => {
  return await request(getOneToOneCommonAPI(), "POST", data);
};

export const getOneToOnePrivate = async (data) => {
  return await request(getOneToOnePrivateAPI(), "POST", data);
};

export const postProcessOneToOneCommon = async (data) => {
  return await request(postProcessOneToOneCommonAPI(), "POST", data);
};

export const postProcessOneToOnePrivate = async (data) => {
  return await request(postProcessOneToOnePrivateAPI(), "POST", data);
};

export const getPeersRatedMe = async () => {
  return await request(getPeersRatedMeAPI());
};

export const postPeersRatedMe = async (data) => {
  return await request(postPeersRatedMeAPI(), "POST", data);
};
