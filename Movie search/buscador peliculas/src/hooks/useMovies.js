import { useState, useRef } from 'react'
import withResults from '../mocks/results.json'
import withoutResults from '../mocks/no-result.json'

export function useMovies({query}){
  const [responseMovies, setResponseMovies] = useState([])
  const previusQuery = useRef(query)


  const movies = responseMovies.Search
  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))


  const getMovies = () =>{
    if (previusQuery.current === query) return
    if(query){
      previusQuery.current = query
      //setResponseMovies(withResults)
      fetch(`https://www.omdbapi.com/?apikey=4d01bf0b&s=${query}`)
      .then(res => res.json()
      .then(json =>{
        setResponseMovies(json)
      })
      )
    }else{
      setResponseMovies(withoutResults)
    }
  }

  
  return {movies: mappedMovies, getMovies}
}
  