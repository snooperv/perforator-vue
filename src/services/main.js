import request from "../helpers/request";
import { getSelfReviewAPI } from "@/helpers/api";

export const getSelfReview = async () => {
  return await request(getSelfReviewAPI());
};
