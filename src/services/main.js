import request from "../helpers/request";
import { getSelfReviewAPI, saveSelfReviewAPI } from "@/helpers/api";

export const getSelfReview = async () => {
  return await request(getSelfReviewAPI());
};

export const saveSelfReview = async (data) => {
  return await request(saveSelfReviewAPI(), "POST", data);
};
