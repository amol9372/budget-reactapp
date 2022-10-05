import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

export const Response = (res) => {
  return { task: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class TaskService {
  static async upsertTask(data, url) {
    let response;

    console.log("[Upsert task Request]", data.task);

    try {
      const res = await axios.post(url, data.task, {
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

export default TaskService;
