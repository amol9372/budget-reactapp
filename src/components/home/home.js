import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Budget from "../budget/budget";
import CategoryView from "../category/categoriesView";

const Home = () => {
  const [authRequired, setAuthRequired] = useState(false);
  const [renderHome, setRenderHome] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setRenderHome(true);
    } else {
      setAuthRequired(true);
      console.log("[Redirecting to login page]");
    }
  }, []);

  return (
    <div>
      {authRequired && <Redirect to="/login" />}
      {renderHome && (
        <>
          <Budget />
          <CategoryView />
        </>
      )}
    </div>
  );
};

export default Home;
