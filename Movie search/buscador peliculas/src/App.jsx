import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


function App() {

  const [sort, setSort] = useState(false)


  const {query, setQuery, error} = useSearch()
  const {movies , getMovies} = useMovies({query, sort})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }


  const debouncedGetMovies = useCallback(
    debounce(query =>{
      console.log('searching')
      getMovies({query})
    }, 300)
  )
 

  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuery(event.target.value)
    debouncedGetMovies(newQuery)
  }


  const handleSort = () =>{
    setSort(!sort)
  }


  return (

    <div>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit' >Search</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>  
        <Movies mappedMovies={movies}/>
      </main>
    </div>

  )
}

export default App
