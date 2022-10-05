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

class LabelService {
  static async getLabels(data, url) {
    let response;

    console.log("[Get Labels Request]", data);

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: "JWT ".concat(data.access_token),
        },
      });

      console.log(res);
      if (res.status === 200) {
        response = Response(res);
      }
      // else {
      //   response = Response(res.statusText);
      // }
    } catch (error) {
      response = errorResponse(error.response);
    }

    return response;
  }

  static async createLabel(data, url) {
    let response;

    // const body = JSON.stringify(data.label);

    console.log("[Add label Request]", data);

    const config = {
      // method: "post",
      // url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT ".concat(data.access_token),
      },
      // data: body,
    };

    console.log("[Create Label Request]", data);

    try {
      const res = await axios.post(url, data.label, config);

      console.log(res);
      if (res.status === 200) {
        response = Response(res);
      }
      // else {
      //   response = Response(res.statusText);
      // }
    } catch (error) {
      response = errorResponse(error.response);
    }

    return response;
  }
}

export default LabelService;
