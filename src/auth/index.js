import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Login from "./LoginComponent";
import Registration from "./RegistrationComponent";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "./AuthStyle.css";

const IndexComponent = (props) => {
  const history = useHistory();
  const [showFormType, setFormType] = useState(true);
  const { addToast } = useToasts();

  //conditional rendering of signup and login
  const handleFormChange = (type) => {
    if (type === 1) {
      setFormType(true);
    } else {
      setFormType(false);
    }
  };

  //handling User registration and login
  const handleSubmit = (postJson, type) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postJson),
    };

    //user login
    if (type === 1) {
      fetch("http://localhost:8888/movieapplication/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("api login response", data);
          if (data.status === 711) {
            addToast("User not registered.", {
              appearance: "error",
              autoDismiss: true,
            });
          }
          if (data.status === 710) {
            addToast("Incorrect username or password.", {
              appearance: "error",
              autoDismiss: true,
            });
          }
          if (data.statuscode === 611) {
            // if (data.userType === "USER_TYPE.TRIAL") {
            //   // console.log(new Date());
            //   var hours = Math.abs(date1 - date2) / 36e5;
            // }
            sessionStorage.setItem("user_id", data.userId);
            sessionStorage.setItem("user_name", data.userName);
            sessionStorage.setItem("user_type", data.userType);
            history.push("/home");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    //user registration
    else {
      fetch("http://localhost:8888/movieapplication/users/", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log("api registraion response===", response);
          if (response.message === "email already exists") {
            addToast("Email Id already registered.", {
              appearance: "error",
              autoDismiss: true,
            });
          }
          if (response.statusCode === 801) {
            addToast("User registered successfully.", {
              appearance: "success",
              autoDismiss: true,
            });
            sessionStorage.setItem("user_id", response.userId);
            sessionStorage.setItem("user_name", response.userName);
            sessionStorage.setItem("user_type", response.userType);
            history.push("/home");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };
  return (
    <div>
      <section className="login-block">
        <div className="container">
          <div className="row">
            {showFormType ? (
              <Login
                handleLogin={handleSubmit}
                handleFormChange={handleFormChange}
              />
            ) : (
              <Registration
                handleRegistration={handleSubmit}
                handleFormChange={handleFormChange}
              />
            )}
            <div className="col-md-8 banner-sec">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block img-fluid"
                      src="batman.jpg"
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <div className="banner-text">
                        <h2>The Dark Knight Trilogy</h2>
                        <p>
                          The fictional superhero Batman, who appears in
                          American comic books published by DC Comics, has
                          appeared in various films since his inception. Created
                          by Bob Kane and Bill Finger.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="starwar.jpg"
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <div className="banner-text">
                        <h2>Star Wars</h2>
                        <p>
                          An American epic space-opera media franchise created
                          by George Lucas, which began with the eponymous 1977
                          film and quickly became a worldwide pop-culture
                          phenomenon.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="aquaman.jpg"
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <div className="banner-text">
                        <h2>Aquaman</h2>
                        <p>
                          American superhero film based on the DC Comics
                          character of the same name. Distributed by Warner
                          Bros. Pictures, it is the sixth film in the DC
                          Extended Universe (DCEU). The film was directed by
                          James Wan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const IndexApp = () => (
  <ToastProvider>
    <IndexComponent />
  </ToastProvider>
);
export default withRouter(IndexApp);
