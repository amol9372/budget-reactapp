import axios from "axios";
import { PermittedURLs } from "../constants";

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
  static async checkTokenExpiry() {
    const token = localStorage.getItem("access_token");
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(Buffer.from(payload, "base64"));
    if (Date.now() / 1000 > decodedPayload.exp) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "JWT ".concat(localStorage.getItem("access_token")),
        },
      };

      let response;
      console.log("[Request]", { email: decodedPayload.email });

      try {
        const res = await axios.post(
          "/refresh-token",
          { email: decodedPayload.email },
          config
        );

        console.log(res);
        if (res.status === 200 || res.status === 201) {
          response = Response(res);
        }
      } catch (error) {
        response = errorResponse(error.response);
      }

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.idToken);
      } else {
        console.log("Error in updating access_token", response);
      }

      // response
      //   .then((res) => {
      //     console.log(res);

      //     if (res.status === 200) {
      //       localStorage.setItem("access_token", res.data.idToken);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error in updating access_token", error);
      //   });
    }
  }

  static async get(body, url) {
    if (!PermittedURLs.includes(url)) {
      await this.checkTokenExpiry(url);
    }
    let response;

    console.log("[Request]", body);

    try {
      const res = await axios.get(url, {
        params: { body },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "JWT ".concat(localStorage.getItem("access_token")),
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
    if (!PermittedURLs.includes(url)) {
      await this.checkTokenExpiry(url);
    }
    let response;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT ".concat(localStorage.getItem("access_token")),
      },
    };

    console.log("[Request]", body);

    try {
      const res = await axios.post(url, body, config);

      console.log(res);
      if (res.status === 200 || res.status === 201) {
        response = Response(res);
      }
    } catch (error) {
      response = errorResponse(error.response);
    }

    return response;
  }

  static async delete(body, url) {
    if (!PermittedURLs.includes(url)) {
      await this.checkTokenExpiry(url);
    }
    let response;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT ".concat(localStorage.getItem("access_token")),
      },
    };

    console.log("[Request]", body);

    try {
      const res = await axios.delete(url, config);

      console.log(res);
      if (res.status === 200 || res.status === 201) {
        response = Response(res);
      }
    } catch (error) {
      response = errorResponse(error.response);
    }

    return response;
  }
}

export default BaseService;
