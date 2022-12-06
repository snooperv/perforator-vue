import request from "../helpers/request";
import {
  getRatesAPI,
  getSelfReviewAPI,
  getUserReviewIsDraftAPI,
  saveSelfReviewAPI,
} from "@/helpers/api";

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
