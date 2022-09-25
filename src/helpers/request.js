import axios from "axios";
import store from "@/store/index";

const request = async (url, method = "GET", data) => {
  await store.dispatch("refreshAuthToken");
  const authToken = localStorage.token;

  let response = null;

  try {
    if (method === "GET" || method === "get") {
      response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    const responseData = await response.data;

    return responseData;
  } catch (e) {
    console.log(e);
    if (e.response.data.detail) throw new Error(e.response.data.detail);
    throw new Error(
      "Произошла ошибка, попробуйте позже или обратитесь в техподдержку"
    );
  }
};

export const requestRefreshToken = async (url, method = "POST", data) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    return await response.data;
  } catch (e) {
    console.log(e);
    if (e.response.data.detail) throw new Error(e.response.data.detail);
    throw new Error(
      "Произошла ошибка, попробуйте позже или обратитесь в техподдержку"
    );
  }
};

export default request;