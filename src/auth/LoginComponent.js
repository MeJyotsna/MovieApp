import React from "react";
import { useForm } from "react-hook-form";
import "./AuthStyle.css";

const LoginComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const handleLogin = (formData) => {
    console.log("submit--", formData);
    var loginJson = {
      emailId: formData.email,
      password: formData.password,
    };
    props.handleLogin(loginJson, 1);
  };
  return (
    <div className="col-md-4 login-sec">
      <h2 className="text-center">Login</h2>
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <div className="form-group">
          <label>Email Id</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name="email"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,3}$/,
            })}
          />
          {errors.email && errors.email?.type === "required" && (
            <span className="errorClass">Email is required.</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="errorClass">Invalid Email Address.</span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder=""
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.password?.type === "minLength" && (
            <span className="errorClass">
              Password should contain min 3 character.
            </span>
          )}
          {errors.password?.type === "maxLength" && (
            <span className="errorClass">
              Password should contain max 20 character.
            </span>
          )}
        </div>
        <div className="row form-group check">
          <div className="col-md-4">
            <span
              className="float-left spanText"
              onClick={() => {
                props.handleFormChange(2);
              }}
            >
              Sign Up
            </span>
          </div>
          <div className="col-md-8">
            <button type="submit" className="btn btn-login float-right">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="row col-md-12">
        <div className="movieLogo">
          <img className="mainLogo" src="logo1.png" alt="logo" />{" "}
          <span className="logoName">MoviesPro</span>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
