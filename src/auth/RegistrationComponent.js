import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import "./AuthStyle.css";

const RegistrationComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const handleRegistration = (formData) => {
    console.log("registeration--", formData);
    var JsonData = {
      emailId: formData.mail,
      password: formData.password,
      phoneNumber: parseInt(formData.mobile),
      userName: formData.name,
      userType: formData.usertype ? "USER_TYPE.PAID" : "USER_TYPE.TRIAL",
    };
    props.handleRegistration(JsonData, 2);
  };
  return (
    <div className="col-md-4 login-sec">
      <h2 className="text-center">Register</h2>
      <form className="login-form" onSubmit={handleSubmit(handleRegistration)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Full Name"
            name="name"
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 25,
              pattern: /[A-Za-z]{3}/,
            })}
          />
          {errors.name && errors.name?.type === "required" && (
            <span className="errorClass">Name is required</span>
          )}
          {errors.name?.type === "minLength" && (
            <span className="errorClass">
              Name should contain min 3 character
            </span>
          )}
          {errors.name?.type === "maxLength" && (
            <span className="errorClass">
              Name should contain max 25 character
            </span>
          )}
          {errors.name?.type === "pattern" && (
            <span className="errorClass">
              Name should contain only alphabets
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="password"
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
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email Address"
            name="mail"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,3}$/,
            })}
          />
          {errors.mail && errors.email?.type === "required" && (
            <span className="errorClass">Email is required.</span>
          )}
          {errors.mail?.type === "pattern" && (
            <span className="errorClass">Invalid Email.</span>
          )}
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Mobile Number"
            name="mobile"
            ref={register({
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.mobile?.type === "required" && (
            <span className="errorClass">Mobile is required</span>
          )}
          {errors.mobile?.type === "minLength" && (
            <span className="errorClass">Mobile should contain 10 digits</span>
          )}
          {errors.mobile?.type === "maxLength" && (
            <span className="errorClass">Mobile should contain 10 digits</span>
          )}
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              name="usertype"
              ref={register({
                required: false,
              })}
            />
            <small>Paid Membership</small>
          </label>
        </div>
        <div className="row form-group check">
          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-secondary float-left"
              onClick={() => {
                props.handleFormChange(1);
              }}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-8">
            <button type="submit" className="btn btn-login float-right">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {/* <div className="row col-md-12">
        <div className="movieLogo">
          <img className="logo" src="logo1.png" alt="logo" />{" "}
          <span className="logoName">MoviesPro</span>
        </div>
      </div> */}
    </div>
  );
};
export default withRouter(RegistrationComponent);
