import BaseService from "./baseService";

class CategoryBudgetService extends BaseService {
  static async getCategories(budgetId) {
    return BaseService.get(null, "/category-budget/".concat(budgetId));
  }

  static async upsertCategory(category) {
    return BaseService.post(category, "/category-budget/".concat(category.id));
  }

  static async createCategory(category) {
    const user = JSON.parse(localStorage.getItem("user"));
    const budget = JSON.parse(localStorage.getItem("currentBudget"));
    const body = { ...category, userId: user.userId, budgetId: budget.id };
    return BaseService.post(body, "/category-budget/");
  }

  static async deleteCategory(categoryId) {
    return BaseService.delete(null, "/category-budget/".concat(categoryId));
  }
}

export default CategoryBudgetService;
