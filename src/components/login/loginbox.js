import Divider from "@material-ui/core/Divider";
// import GoogleLoginButton from "../social-login/GoogleLoginButton";
import React, { useState } from "react";
import Card from "../UI/card";
import MyButton from "../UI/button";
import InputField from "../UI/inputfield";
import CardBox from "../UI/cardbox";
import { Link } from "@material-ui/core";
import Label from "../UI/label";
import LoadingIndicator from "../UI/loader";
import { isMobile } from "react-device-detect";

function LoginBox(props) {
  const userAttribute = {
    value: "",
    validation: "",
    error: false,
  };
  const [email, setEmail] = useState(userAttribute);
  const [password, setPassword] = useState(userAttribute);

  const handleAuthResponse = (res) => {
    props.googleLogin(res);
  };

  const loginFormSubmit = (event) => {
    event.preventDefault();
    const data = { email: email.value, password: password.value };

    props.onFormSubmit(data);
  };

  const emailHandler = (event) => {
    setEmail({ value: event.target.value, validation: "" });
  };

  const passwordHandler = (event) => {
    setPassword({ value: event.target.value, validation: "" });
  };

  const newUserStyle = {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "ceneter",
    gap: "5px",
    margin: "auto",
  };

  const loginCardWidth = () => {
    if (isMobile) {
      return "70%";
    } else {
      return "100%";
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={loginFormSubmit}>
        <CardBox align="center" width="70%">
          <Card width="30%">
            <Label color="hsla(0,0%,100%,.87)" font="25px">
              Login{" "}
            </Label>

            {/* <GoogleLoginButton authResponse={handleAuthResponse} /> */}
            <Divider style={{ background: "hsla(0,0%,80%,.37)" }} />
            <InputField
              label="Email"
              type="text"
              value={email.value}
              onchange={emailHandler}
              error={email.error}
              validationText={email.validation}
              required={true}
            />
            <InputField
              label="Password"
              type="password"
              value={password.value}
              onchange={passwordHandler}
              validationText={password.validation}
              required={true}
            />
            <MyButton backgroundColor="grey" text="Login" type="submit" />
            <div style={newUserStyle}>
              <Label color="hsla(2,40%,90%,.77)"> New User ? </Label>
              <Link href="/register" color="secondary">
                Sign Up
              </Link>
            </div>
          </Card>

          <LoadingIndicator />

          {props.response && (
            <Label color="hsla(0,0%,100%,.77)"> {props.response} </Label>
          )}
        </CardBox>
      </form>
    </React.Fragment>
  );
}

export default LoginBox;
