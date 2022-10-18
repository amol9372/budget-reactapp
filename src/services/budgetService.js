import BaseService from "./baseService";

export const Response = (res) => {
  return { data: res.data, status: res.status };
};

export const errorResponse = (error) => {
  return { message: error.data.description, status: error.status };
};

class BudgetService extends BaseService {
  static async fetchBudgetDetails(budgetId) {
    return BaseService.get(null, "/budget/".concat(budgetId));
  }

  static async createBudget(budget) {
    const user = JSON.parse(localStorage.getItem("user"));
    const body = { ...budget, userId: user.userId, currency: "CAD" };
    return BaseService.post(body, "/budget");
  }

  static async fetchAllBudgets() {
    const user = JSON.parse(localStorage.getItem("user"));

    return BaseService.get(null, "/budget/all/".concat(user.userId));
  }
}

export default BudgetService;
