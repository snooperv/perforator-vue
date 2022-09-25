import request, { refreshAuthToken } from "../helpers/request";
import { refreshTokenAPI, getNewTokenAPI } from "../helpers/api";

export const refreshToken = async (data) => {
  return await refreshAuthToken(refreshTokenAPI(), "POST", data);
};

export const getNewToken = async (data) => {
  return await request(getNewTokenAPI(), "POST", data);
};
