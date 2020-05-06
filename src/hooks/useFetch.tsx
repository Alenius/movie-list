import { useState, useEffect } from 'react'

export const useFetch = (url: string | undefined, options: RequestInit) => {
  const [response, setResponse] = useState<OMDbResult | null>(null)
  const [error, setError] = useState()

  useEffect(() => {
    if (!url) return
    const asyncFetch = async () => {
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        setResponse(json)
      } catch (err) {
        setError(error)
      }
    }

    asyncFetch()
  }, [url])

  return { response, error }
}
