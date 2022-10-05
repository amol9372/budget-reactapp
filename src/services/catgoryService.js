import { sampleBudgetCategories } from "../components/category/test-budgetCategory";
import BaseService from "./baseService";

class CategoryService extends BaseService {
  static async getCategories(body) {
    // return BaseService.get(body, "/expense")
    return sampleBudgetCategories;
  }

  static async upsertCategory(body) {
    return BaseService.post(body, "/category");
  }
}

export default CategoryService;
