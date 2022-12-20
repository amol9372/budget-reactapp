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
    const categoryArray = expense.category.split(":");
    const body = {
      ...expense,
      budgetId: budget.id,
      paidBy: user.email,
      createdBy: user.email,
      category: categoryArray[1],
      subCategory: categoryArray[0],
      categoryId: categoryArray[2],
    };
    return BaseService.post(body, "/expense");
  }
}

export default ExpenseService;
