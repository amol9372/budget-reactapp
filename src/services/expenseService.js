import { sampleExpenses } from "../components/expenses/test";
import BaseService from "./baseService";

class ExpenseService extends BaseService {
  static async getExpenses(body) {
    // return BaseService.get(body, "/expense")
    return sampleExpenses;
  }

  static async createExpense(body) {
    return BaseService.post(body, "/expense");
  }
}

export default ExpenseService;
