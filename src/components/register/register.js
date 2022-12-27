import { Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { trackPromise } from "react-promise-tracker";
import { Redirect } from "react-router";
import UserService from "../../services/userServive";
import MyButton from "../UI/button";
import Card from "../UI/card";
import CardBox from "../UI/cardbox";
import InputField from "../UI/inputfield";
import Label from "../UI/label";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

function Register() {
  const userAttribute = {
    value: "",
    validation: "",
    error: false,
  };
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [firstname, setFirstName] = useState(userAttribute);
  const [lastname, setLastName] = useState(userAttribute);
  const [email, setEmail] = useState(userAttribute);
  const [password, setPassword] = useState(userAttribute);
  const [confirmPassword, setConfirmPassword] = useState(userAttribute);
  const [response, setResponse] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("[User Already Signed in]");
      setUserLoggedIn(true);
    } else {
      console.log("[Redirecting to login page]");
    }
  }, []);

  // const handleAuthResponse = (res) => {
  //   console.log("[Auth response]", res);
  // };

  const loginFormSubmit = (event) => {
    setResponse("");
    event.preventDefault();

    console.log(
      "[Signup details]",
      firstname.value,
      lastname.value,
      email.value,
      password.value,
      confirmPassword.value
    );

    if (password.value !== confirmPassword.value) {
      setPassword({
        value: password.value,
        error: true,
      });
      setConfirmPassword({
        value: confirmPassword.value,
        validation: "Password and confirm password does not match",
        error: true,
      });

      setResponse("Please enter Correct password and confirm password");
      return;
    }

    setShowSpinner(true);
    const data = {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      password: password.value,
      provider: "Application",
    };

    // axios
    //   .post("/user/register", data, { withCredentials: true })
    //   .then((res) => {
    //     if (res.data.status === 201) {
    //       setShowSpinner(false);
    //       setResponse("User created successfully, Redirecting to login ....");
    //       console.log(res.data);
    //       setUserLoggedIn(true);
    //     }
    //   })
    //   .catch((error) => {
    //     setShowSpinner(false);
    //     setResponse(error.message);
    //     console.log(error.message);
    //   });
    const response = trackPromise(UserService.createUser(data));

    response
      .then((res) => {
        console.log(res);

        if (res.status === 201 || res === 200) {
          setResponse("User created successfully, Redirecting to login ....");
          setUserLoggedIn(true);
        }
      })
      .catch((error) => {
        setShowSpinner(false);
        setResponse(error.message);
        console.log(error.message);
      });
  };

  const firstnameHandler = (event) => {
    setFirstName({ value: event.target.value });
  };

  const lastnameHandler = (event) => {
    setLastName({ value: event.target.value });
  };

  const emailHandler = (event) => {
    setEmail({ value: event.target.value });
  };

  const passwordHandler = (event) => {
    setPassword({ value: event.target.value });
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword({ value: event.target.value });
  };

  const newUserStyle = {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "ceneter",
    gap: "5px",
    margin: "auto",
  };

  const cardWidth = () => {
    if (isMobile) {
      return "80%";
    }
    return "40%";
  };

  return (
    <React.Fragment>
      <form onSubmit={loginFormSubmit}>
        <CardBox width="90%">
          <Card width={cardWidth()} maxWidth="70%">
            <Label color="hsla(0,0%,100%,.87)" font="25px">
              Register{" "}
            </Label>
            {userLoggedIn && <Redirect to="/home" />}
            {/* <GoogleLoginButton authResponse={handleAuthResponse} /> */}

            <Divider
              variant="fullWidth"
              style={{ background: "hsla(0,0%,80%,.37)" }}
            />

            <InputField
              label="Firstname"
              type="text"
              value={firstname.value}
              onchange={firstnameHandler}
              error={firstname.error}
              validationText={firstname.validation}
              required={true}
            />

            <InputField
              label="Lastname"
              type="text"
              value={lastname.value}
              onchange={lastnameHandler}
              error={lastname.error}
              validationText={lastname.validation}
              required={true}
            />

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
              type="text"
              value={password.value}
              onchange={passwordHandler}
              error={password.error}
              validationText={password.validation}
              required={true}
            />

            <InputField
              label="Confirm Password"
              type="password"
              value={confirmPassword.value}
              onchange={confirmPasswordHandler}
              error={confirmPassword.error}
              validationText={confirmPassword.validation}
              required={true}
            />

            <MyButton
              backgroundColor="purple"
              text="Sign Up"
              size="medium"
              type="submit"
            />

            <div style={newUserStyle}>
              <Label color="hsla(2,40%,90%,.77)"> Already Registered ? </Label>
              <Link href="/login" color="secondary">
                Login
              </Link>
            </div>
          </Card>

          {showSpinner && <CircularProgress color="secondary" />}

          {response && <label style={{ color: "white" }}>{response} </label>}
        </CardBox>
      </form>
    </React.Fragment>
  );
}

export default Register;
