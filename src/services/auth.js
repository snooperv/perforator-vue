import request, { requestRefreshToken } from "../helpers/request";
import { refreshTokenAPI, getNewTokenAPI } from "../helpers/api";

export const refreshToken = async (data) => {
  return await requestRefreshToken(refreshTokenAPI(), "POST", data);
};

export const getNewToken = async (data) => {
  return await request(getNewTokenAPI(), "POST", data);
};
