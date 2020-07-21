import React, { useEffect, useState } from "react";
import Header from "../shared/HeaderComponent";
import "./ComponentStyle.css";

const WatchedMoviesList = (props) => {
  console.log("from watched list--", props);
  const [watchedMovieList, setWatchedMovieList] = useState([]);
  useEffect(() => {
    getWatchedMovieList();
  }, []);

  //fetching watched movies
  const getWatchedMovieList = () => {
    var userId = sessionStorage.getItem("user_id");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      "http://localhost:8888/movieapplication/users/" +
        userId +
        "/moviehistory",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("api response watched list---------", response);
        setWatchedMovieList(response.movieHistoryResponseList);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  //Fetching searched movies
  const handleSearch = (searchedText) => {
    console.log(searchedText);
    if (searchedText === "") {
      getWatchedMovieList();
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(
        "http://localhost:8888/movieapplication/movies?movieType=" +
          searchedText,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("api seacrh response to get ALL list---------", response);
          if (response.statusCode === 901) {
            setWatchedMovieList(response.movieInfosList);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };
  return (
    <div>
      <Header onSearchChange={handleSearch} />
      <div className="mainContainer">
        <div className="row">
          <div className="col-md-12">
            <div className="row listStyle">
              {watchedMovieList.map((movie, id) => (
                <div className="col-md-3 cardItemStyle" key={id}>
                  <div className="card cardStyle">
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        title="vid1"
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/SC1XE85BC9o"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="card-body">
                      <span className="card-title">
                        <h6>Movie Name:{movie.movieName}</h6>
                        <h6>Movie Type: {movie.movieType}</h6>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WatchedMoviesList;
