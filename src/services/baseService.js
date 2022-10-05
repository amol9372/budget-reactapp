import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

export const Response = (res) => {
  return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class BaseService {
  static async get(body, endPoint) {
    let response;

    console.log("[Fetch Expenses Request]", body);

    try {
      const res = await axios.get(endPoint, {
        params: { body },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: "JWT ".concat(body.access_token),
        },
      });

      console.log(res);
      if (res.status === 200) {
        response = Response(res);
      }
    } catch (error) {
      response = errorResponse(error.response);
    }

    return response;
  }

  static async post(body, url) {
    let response;

    // const body = JSON.stringify(data.label);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "JWT ".concat(body.access_token),
      },
    };

    console.log("[Request]", body);

    try {
      const res = await axios.post(url, body, config);

      console.log(res);
      if (res.status === 200) {
        response = Response(res);
      }
    } catch (error) {
      response = errorResponse(error.response);
    }

    return response;
  }
}

export default BaseService;
