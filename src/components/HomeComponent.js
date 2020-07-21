import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import Header from "../shared/HeaderComponent";
import "./ComponentStyle.css";

const HomeComponent = (props) => {
  const [moviesList, setMoviesList] = useState([]);
  // const [watchedMovieList, setwatchedMovieList] = useState([]);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8888/movieapplication/movies", requestOptions)
      // fetch("http://localhost:8888/movieapplication/movies/3", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("api response to get ALL list---------", response);
        if (response.statusCode === 900) {
          setMoviesList(response.movieInfosList);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  //handling watch of video
  const handleWatch = (movie_id) => {
    document.getElementById("card-image").style.display = "none";
    document.getElementsByTagName("iframe")[0].src += "?autoplay=1&mute=1";
    console.log("Card clicked");
    var watchMovieDto = {
      movieId: movie_id,
      userId: parseInt(sessionStorage.getItem("user_id")),
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchMovieDto),
    };
    fetch("http://localhost:8888/movieapplication/user-movies/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("api response post ---------", response);
        // {msg: "done with watching movie", statusCode: 800}
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  //handle search bar
  const handleSearchList = (searchedText) => {
    console.log(searchedText);
    if (searchedText === "") {
      getMovieList();
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
            setMoviesList(response.movieInfosList);
          }
          if (response.status === 713) {
            setMoviesList([]);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };
  return (
    <div>
      <Header onSearchChange={handleSearchList} />
      <div className="mainContainer">
        <div className="row">
          <div className="col-md-12">
            {moviesList && moviesList.length === 0 ? (
              <div>No movie found.</div>
            ) : (
              <div className="row listStyle">
                {moviesList.map((movie, id) => (
                  <div className="col-md-3 cardItemStyle" key={movie.movieId}>
                    <div className="card cardStyle">
                      <div
                        className="overlay"
                        id="card-image"
                        onClick={() => handleWatch(movie.movieId)}
                      ></div>
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
                          <h6>
                            Movie Name:{movie.movieName}--{movie.movieId}
                          </h6>
                          <h6>Movie Type: {movie.movieType}</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeComponent;
