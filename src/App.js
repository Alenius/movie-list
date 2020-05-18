import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

import imdbTopList from "./assets/imdb_top.json";
import "./App.css";
import { Button } from "./components/Button";
import { useFetch } from "./hooks/useFetch";

const BACKEND_ENDPOINT_BASE =
  "https://aa-movie-list-backend.herokuapp.com/movie?title=";

export const getRandomInt = (maxValue) =>
  Math.floor(Math.random() * Math.floor(maxValue));

const MovieRandomizer = () => {
  const [movie, setMovie] = useState(encodeURIComponent("Pulp Fiction"));
  const [movieArray, setMovieArray] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
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
      setMovie(movieArray[randomIndex]);
      setLoading(false);
    }
  }, [movieArray, randomIndex]);

  const randomizeNewNumber = () => {
    setRandomIndex(getRandomInt(movieArray.length));
    setLoading(true);
  };

  return (
    <div className="base-div">
      <h1 className="title">MovieRandomizer</h1>
      <div className="container">
        <div className="img-container">
          {loading ? (
            <p>Loading poster...</p>
          ) : (
            <img
              src={movie?.posterLink}
              alt="movie-poster"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(true)}
            />
          )}
        </div>
        <h2 style={{ textAlign: "center" }}>{movie?.movieTitle}</h2>
        <div className="rank-rate-div">
          <p className="rank-rate-p">
            IMDB-ranking:{" "}
            <span style={{ fontWeight: "bold" }}>
              {movie && randomIndex + 1}
            </span>
          </p>
          <p className="rank-rate-p">
            IMDB-rating:{" "}
            <span style={{ fontWeight: "bold" }}>{movie?.movieRating}</span>
          </p>
        </div>
      </div>
      <div className="container">
        <Button title="Randomize new movie" onClick={randomizeNewNumber} />
      </div>
    </div>
  );
};

export default MovieRandomizer;
