import axios from "axios";
import store from "@/store/index";

let isRefresh = false;

const request = async (url, method = "GET", data) => {
  if (!isRefresh) await store.dispatch("refreshAuthToken");
  let response = null;

  try {
    async function processRequest() {
      if (isRefresh) {
        await new Promise((resolve) => {
          setTimeout(() => resolve(processRequest()), 1);
        });
      } else {
        const authToken = localStorage.token;
        if (method === "GET" || method === "get") {
          response = await axios({
            method: "GET",
            url,
            headers: {
              // Authorization: `Bearer ${authToken}`,
              token: authToken,
            },
            withCredentials: true,
          });
        } else {
          if (url.includes("/login"))
            response = await axios({
              method,
              url,
              data,
              withCredentials: true,
            });
          else
            response = await axios({
              method,
              url,
              data,
              headers: {
                token: authToken,
              },
              withCredentials: true,
            });
        }
      }
    }

    await processRequest();
    return await response.data;
  } catch (e) {
    console.log(e);
    if (e.response.data && e.response.data.detail)
      throw new Error(e.response.data.detail);
    throw new Error("Произошла ошибка: " + e.message);
  }
};

export const requestRefreshToken = async (url, method = "POST", data) => {
  try {
    isRefresh = true;
    const response = await axios({
      method,
      url,
      data,
      withCredentials: true,
    });

    let answer;
    if (response.data.status === "ok") {
      answer = {
        token: await response.data.token_f,
        lifetime: await response.data.token_f_lifetime,
      };
    }

    return answer;
  } catch (e) {
    console.log(e);
    if (e.response.data.detail) throw new Error(e.response.data.detail);
  } finally {
    isRefresh = false;
  }
};

export default request;
