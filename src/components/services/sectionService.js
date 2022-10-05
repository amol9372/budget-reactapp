import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

export const Response = (res) => {
  return { sections: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class SectionService {
  static async getSections(data, url) {
    let response;

    // const body = JSON.stringify({
    //   label_id: data.label_id,
    // });

    console.log("[Get Sections Request]", data);

    // const config = {
    //   // method: "get",
    //   // url: url,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "JWT ".concat(data.access_token),
    //   },

    //   data: body,
    // };

    try {
      const res = await axios.get(url, {
        params: {
          label_id: data.label_id,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

  static async createSection(data, url) {
    let response;

    console.log("[Create Section Request]", data.section);

    try {
      const res = await axios.post(url, data.section, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "JWT ".concat(data.access_token),
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
}

export default SectionService;
