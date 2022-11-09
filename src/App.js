import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Register from "./components/register/register";
import { UserContext } from "./context";
import LoginPage from "./components/login/loginpage";
import BudgetView from "./components/budget/budgetView";
import ExpenseHome from "./components/expenses/expense-home";

function App() {
  return (
    <UserContext.Provider value={{ user: {} }}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={Register} />
            <Route path="/budgetview" component={BudgetView} />
            <Route path="/expenses" component={ExpenseHome} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
