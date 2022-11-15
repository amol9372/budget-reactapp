import React, { useState, useEffect } from "react";
import LoginBox from "./loginbox";
import { Redirect } from "react-router";
import { trackPromise } from "react-promise-tracker";
import UserService from "../../services/userServive";

const LoginPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("[User Already Signed in]");
      setUserLoggedIn(true);
    } else {
      console.log("[User needs to login]");
    }
    // return () => {};
  }, []);

  // const googleLoginResponse = (res) => {
  //   if (res.error) {
  //     setResponse(res.error);
  //     setUserLoggedIn(false);
  //     return;
  //   }

  //   console.log(res);

  //   const request = { id_token: res.tokenId, profile: res.profileObj };

  //   // getLoginResponse("/user/google-signin", request);
  // };

  const onLogin = (data) => {
    getLoginResponse(data);
  };

  const getLoginResponse = (request) => {
    setResponse("");
    const response = trackPromise(UserService.loginUser(request));

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.idToken);
          //localStorage.setItem("refresh_token", res.data.refresh_token);
          localStorage.setItem("user", JSON.stringify(res.data));
          setUserLoggedIn(true);
        }

        //setResponse(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {userLoggedIn && <Redirect to="/home" />}
      <LoginBox
        onFormSubmit={onLogin}
        response={response}
        // googleLogin={googleLoginResponse}
      />
    </React.Fragment>
  );
};

export default LoginPage;
