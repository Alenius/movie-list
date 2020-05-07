import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useFetch } from '../hooks/useFetch'

const baseUrl = process.env.GATSBY_BASE_URL

const MovieRandomizer = () => {
  const [movie, setMovie] = useState(encodeURIComponent('Pulp Fiction'))
  const [movieInput, setMovieInput] = useState('')
  const { response, error: fetchError } = useFetch(`${baseUrl}+&t=${encodeURIComponent(movie)}`, { method: 'GET' })

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    setMovie(movieInput)
    setMovieInput('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setMovieInput(e.target.value)
  }

  return (
    <div>
      <p>wow random</p>
      <form onSubmit={e => handleSubmit(e)}>
        <input placeholder="Movie title" title="Movie to search for" onChange={e => handleChange(e)} />
      </form>
      <img src={response?.Poster} alt="movie-poster" />
      <p>{response ? response?.Title : fetchError}</p>
      <p>{response && response?.imdbRating}</p>
    </div>
  )
}

export default MovieRandomizer
