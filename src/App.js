import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

import imdbTopList from "./assets/imdb_top.json";
import "./App.css";
import { Button } from "./components/Button";

export const getRandomInt = (maxValue) =>
  Math.floor(Math.random() * Math.floor(maxValue));

const MovieRandomizer = () => {
  const [movie, setMovie] = useState(encodeURIComponent("Pulp Fiction"));
  const [movieArray, setMovieArray] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("new movie arr", imdbTopList);
    setMovieArray(imdbTopList.movieArray);
  }, []);

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
