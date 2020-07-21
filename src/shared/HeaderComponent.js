import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SharedStyle.css";

const HeaderComponent = (props) => {
  const [searchText, setsearchText] = useState("");
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
  };

  //search movies
  const handleText = (event) => {
    if (event.target.value === "") {
      props.onSearchChange(event.target.value);
    }
  };
  const handleTextChange = (event) => {
    event.preventDefault();
    props.onSearchChange(event.target.value);
  };

  // users watch list
  const handleWatch = () => {
    history.push("/watchedMovies");
  };
  return (
    <div className="headerStyle">
      <nav className="middleHeader">
        <div className="container navContainer">
          <div className="row">
            <div
              className="col-md-2 compLogo"
              onClick={() => history.push("/home")}
            >
              <img className="logo" src="logo1.png" alt="logo" />{" "}
              <span className="logoName">MoviesPro</span>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-8">
                  <div className="searchBar">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="searchMovie"
                      value={searchText}
                      onChange={(event) => {
                        setsearchText(event.target.value);
                        handleText(event);
                      }}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          handleTextChange(event);
                        }
                      }}
                      required
                    />
                    <i className="fa fa-search"></i>
                  </div>
                </div>
                <div className="col-md-4 userClass">
                  Welcome {sessionStorage.getItem("user_name")}!
                </div>
              </div>
            </div>
            <div className="col-md-1 watches">
              <span onClick={handleWatch}>
                <i
                  className="fa fa-television fa-2x"
                  title="Watched Movies"
                ></i>
              </span>
            </div>
            <div className="col-md-1 rightBar">
              <span
                className="logoutBar"
                onClick={(e) => {
                  handleLogout(e);
                  sessionStorage.clear();
                }}
              >
                <b>Logout</b>{" "}
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default HeaderComponent;
