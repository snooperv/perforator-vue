import request from "../helpers/request";
import { getMyPeersAPI } from "../helpers/api";

export const getMyPeers = async () => {
  return await request(getMyPeersAPI());
};
