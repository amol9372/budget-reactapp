import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Register from "./components/register/register";
import { UserContext } from "./context";
import LoginPage from "./components/login/loginpage";

function App() {
  return (
    <UserContext.Provider value={{ user: {} }}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
