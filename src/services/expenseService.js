import BaseService from "./baseService";

class ExpenseService extends BaseService {
  static async getExpenses() {
    const body = {
      budgetId: JSON.parse(localStorage.getItem("currentBudget")).id,
    };
    return BaseService.post(body, "/expense/search");
    // return sampleExpenses;
  }

  static async createExpense(expense) {
    const user = JSON.parse(localStorage.getItem("user"));
    const budget = JSON.parse(localStorage.getItem("currentBudget"));
    const body = {
      ...expense,
      budgetId: budget.id,
      paidBy: user.email,
      createdBy: user.email,
    };
    return BaseService.post(body, "/expense");
  }
}

export default ExpenseService;
