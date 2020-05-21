import React, { useState, useEffect } from "react";

import imdbTopList from "./assets/imdb_top.json";
import "./App.less";
import { useFetch } from "./hooks/useFetch";
import { Spin, Button } from "antd";

const BACKEND_ENDPOINT_BASE =
  "https://aa-movie-list-backend.herokuapp.com/movie?title=";

export const getRandomInt = (maxValue) =>
  Math.floor(Math.random() * Math.floor(maxValue));

const MovieRandomizer = () => {
  const [movie, setMovie] = useState(encodeURIComponent("Pulp Fiction"));
  const [movieArray, setMovieArray] = useState([]);
  const [index, setIndex] = useState(0);
  const {
    response,
    error: fetchError,
  } = useFetch(
    `${BACKEND_ENDPOINT_BASE}=${encodeURIComponent(movie.movieTitle)}`,
    { method: "GET" }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovieArray(imdbTopList.movieArray);
  }, []);

  useEffect(() => {
    if (response) {
      setMovie({ ...movie, posterLink: response.Poster });
    }
  }, [response]);

  useEffect(() => {
    if (movieArray.length) {
      setMovie(movieArray[index]);
    }
  }, [movieArray, index]);

  const randomizeNewNumber = () => {
    setLoading(true);
    setIndex(getRandomInt(movieArray.length));
  };

  return (
    <div className="base-div">
      <h1 className="title">MovieRandomizer</h1>
      <div className="container">
        <div className="img-container">
          {loading && <Spin size="large" />}
          <img
            className="poster-image"
            style={{ display: loading && "none" }}
            src={movie?.posterLink}
            alt="movie-poster"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(true)}
          />
        </div>
        <h2 style={{ textAlign: "center" }}>{movie?.movieTitle}</h2>
        <div className="rank-rate-div">
          <p className="rank-rate-p">
            IMDB-ranking:{" "}
            <span style={{ fontWeight: "bold" }}>{movie && index + 1}</span>
          </p>
          <p className="rank-rate-p">
            IMDB-rating:{" "}
            <span style={{ fontWeight: "bold" }}>{movie?.movieRating}</span>
          </p>
        </div>
      </div>
      <div className="container">
        <Button
          type="primary"
          size="large"
          onClick={() => randomizeNewNumber()}
        >
          Randomize new movie
        </Button>
      </div>
    </div>
  );
};

export default MovieRandomizer;
