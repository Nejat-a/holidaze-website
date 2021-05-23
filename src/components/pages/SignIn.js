import "../../App.css";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL, tokenPath } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";

const url = BASE_URL + tokenPath;
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please enter your username ")
    .min(3, "Please enter a valid username"),
  password: yup
    .string()
    .required("password is required ")
    .min(6, "password should be at least 6 characters"),
});
export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);
  console.log(auth);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(false);
    const body = {
      identifier: data.username,
      password: data.password,
    };
    try {
      const response = await axios.post(url, body);
      console.log(response, response.data);
      setAuth(response.data);
      history.push("/dashboard");
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  // setSuccessMsg(`Thank you ! Message is sent.`);

  return (
    <div className="hero-section">
      <form
        className="contact-form"
        id="contactForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Welcome back Admin. Please login.</h2>
        <p className="login-error">{loginError}</p>
        <fieldset disabled={submitting} style={{ border: "none" }}>
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="Please enter your username"
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="text"
              {...register("password")}
              placeholder="Please enter your password"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <Button>{submitting ? "logging in" : "Login"}</Button>
        </fieldset>
      </form>
    </div>
  );
};
