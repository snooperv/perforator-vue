import request from "../helpers/request";
import {
  addWorkerPeerAPI,
  approveWorkerAPI,
  getAllPeersAPI,
  getInfoTeamAPI,
  getMyPeersAPI,
  getUserPeersAPI,
  removeMyPeerAPI,
  removeWorkerPeerAPI,
  saveMyPeerAPI,
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
