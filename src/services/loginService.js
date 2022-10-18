import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

export const Response = (res, loggedIn) => {
  return { message: res.statusText, loggedIn: loggedIn, data: res.data };
};

export const ErrorResponse = (error, loggedIn) => {
  return { message: error.message, loggedIn: loggedIn };
};

class LoginService {
  static async userLogin(data, url) {
    let response;

    console.log("[Standard Auth Request]", data);

    // const body = JSON.stringify({
    //   email: "amolsingh9372@gmail.com",
    //   password: "password",
    // });

    // const config = {
    //   method: "post",
    //   url: url,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   data: body,
    // };

    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        response = Response(res, true);
      } else {
        response = Response(res, false);
      }
    } catch (error) {
      response = ErrorResponse(error, false);
    }

    return response;
  }
}

export default LoginService;
