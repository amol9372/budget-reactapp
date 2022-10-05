import BaseService from "./baseService";

export const Response = (res) => {
  return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class UserService extends BaseService {
  static async fetchUserDetails() {}

  static async createUser(userDetails) {
    return BaseService.post(userDetails, "/create-user");
  }

  static async loginUser(credentials) {
    return BaseService.post(credentials, "/login");
  }
}

export default UserService;
