import request from "../helpers/request";
import {
  getMyProfileAPI,
  getRatesAPI,
  getSelfReviewAPI,
  getStatusPerformanceReviewAPI,
  getUserReviewIsDraftAPI,
  saveSelfReviewAPI,
} from "@/helpers/api";

export const getMyProfile = async () => {
  return await request(getMyProfileAPI());
};

export const getSelfReview = async () => {
  return await request(getSelfReviewAPI());
};

export const saveSelfReview = async (data) => {
  return await request(saveSelfReviewAPI(), "POST", data);
};

export const getUserReviewIsDraft = async (id) => {
  return await request(getUserReviewIsDraftAPI({ id }));
};

export const getRates = async (id) => {
  return await request(getRatesAPI({ id }));
};

export const getStatusPerformanceReview = async () => {
  return await request(getStatusPerformanceReviewAPI());
};
