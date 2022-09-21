import axios from "axios";

const request = async (url, method = "GET", data) => {
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
    throw new Error(
      "Произошла ошибка, попробуйте позже или обратитесь в техподдержку"
    );
  }
};

export default request;
