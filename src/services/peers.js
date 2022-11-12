import request from "../helpers/request";
import {
  getAllPeersAPI,
  getMyPeersAPI,
  removeMyPeerAPI,
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
