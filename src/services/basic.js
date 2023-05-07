import request from "../helpers/request";
import {
  beginPerformanceReviewAPI,
  closePerformanceReviewAPI,
  getListPerformanceReviewAPI,
  getMyProfileAPI,
  getQuestionsAPI,
  getRatesAPI,
  getReviewEmployeeAPI,
  getSelfReviewAPI,
  getSelfReviewIdAPI,
  getStatusPerformanceReviewAPI,
  getUserReviewIsDraftAPI,
  nextStagePerformanceReviewAPI,
  saveQuestionsAPI,
  saveSelfReviewAPI,
  updateQuestionsAPI,
} from "@/helpers/api";

export const getMyProfile = async () => {
  return await request(getMyProfileAPI());
};

export const getSelfReview = async () => {
  return await request(getSelfReviewAPI());
};

export const getSelfReviewId = async (id) => {
  return await request(getSelfReviewIdAPI(), "POST", id);
};

export const getReviewEmployee = async (data) => {
  return await request(getReviewEmployeeAPI(), "POST", data);
};

export const saveSelfReview = async (data) => {
  return await request(saveSelfReviewAPI(), "POST", data);
};

export const getUserReviewIsDraft = async (id) => {
  return await request(getUserReviewIsDraftAPI({ id }));
};

export const getStatusPerformanceReview = async () => {
  return await request(getStatusPerformanceReviewAPI());
};

export const beginPerformanceReview = async () => {
  return await request(beginPerformanceReviewAPI(), "POST");
};

export const nextStagePerformanceReview = async (date) => {
  return await request(nextStagePerformanceReviewAPI(), "POST", {
    deadline: date,
  });
};

export const closePerformanceReview = async () => {
  return await request(closePerformanceReviewAPI(), "POST");
};

export const getListPerformanceReview = async () => {
  return await request(getListPerformanceReviewAPI());
};

export const getQuestions = async (data) => {
  return await request(getQuestionsAPI(), "POST", data);
};

export const saveQuestions = async (data) => {
  return await request(saveQuestionsAPI(), "POST", data);
};

export const updateQuestions = async (data) => {
  return await request(updateQuestionsAPI(), "POST", data);
};
