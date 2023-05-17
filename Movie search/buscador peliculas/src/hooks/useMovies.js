import { useState, useRef, useMemo, useCallback } from 'react'
import withResults from '../mocks/results.json'
import withoutResults from '../mocks/no-result.json'

export function useMovies({query, sort}){
  const [responseMovies, setResponseMovies] = useState([])
  const previusQuery = useRef(query)


  const movies = responseMovies.Search
  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  // useCallback se utiliza para renderizar solamente una vez la funcion
  const getMovies = useCallback(() =>{
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
  },[query])

  // a pesar de que funciona, se encuentra dentro de la función, por lo que
  // se corre el código cada vez que se renderiza, estamos renderizando
  // cada vez que hay un cambio en el input, por lo que no nos funciona
  // const getSortedMovies = () =>{
  //   const sortedMovies = sort 
  //   ? [...mappedMovies].sort((a,b) => a.title.localeCompare(b.title))
  //   : mappedMovies

  //   return sortedMovies
  // }



  const sortedMovies = useMemo(() =>{
    return sort 
    ? [...mappedMovies].sort((a,b) => a.title.localeCompare(b.title))
    : mappedMovies
  },[sort, mappedMovies])



  
  
  return {movies: sortedMovies, getMovies}
}
  