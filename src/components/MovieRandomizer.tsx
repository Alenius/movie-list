import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { getRandomInt } from '../utils'

import { imdbTopList } from '../../assets'
import { useFetch } from '../hooks/useFetch'

const baseUrl = process.env.GATSBY_BASE_URL

interface BaseMovie {
  movieTitle: string
  yearOfRelease: string
  movieRating: string
}

const MovieRandomizer = () => {
  const [movie, setMovie] = useState(encodeURIComponent('Pulp Fiction'))
  const [movieInput, setMovieInput] = useState('')
  const { response, error: fetchError } = useFetch(`${baseUrl}+&t=${encodeURIComponent(movie)}`, { method: 'GET' })
  const [movieArray, setMovieArray] = useState<BaseMovie[]>([])
  const [randomIndex, setRandomIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('new movie arr', imdbTopList)
    setMovieArray(imdbTopList.movieArray)
  }, [])

  useEffect(() => {
    if (movieArray.length) {
      setMovie(movieArray[randomIndex].movieTitle)
      setLoading(false)
    }
  }, [movieArray, randomIndex])

  const randomizeNewNumber = () => {
    console.log(movieArray.length)
    setRandomIndex(getRandomInt(movieArray.length))
    setLoading(true)
  }

  return (
    <div>
      {loading || (
        <div>
          <img src={response?.Poster} alt="movie-poster" />
          <p>{response ? response?.Title : fetchError}</p>
          <p>IMDB-rating: {response && response?.imdbRating}</p>
          <p>IMDB-ranking: {response && randomIndex + 1}</p>
          <button type="button" onClick={() => randomizeNewNumber()}>
            Randomize new movie
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieRandomizer
