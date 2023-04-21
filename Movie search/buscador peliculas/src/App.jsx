import { useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'




function App() {
  const {movies: mappedMovies} = useMovies()
  const [query, setQuery] = useState()

  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(query)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }


  return (

    <div>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit' >Search</button>
        </form>
      </header>

      <main>  
        <Movies mappedMovies={mappedMovies}/>
      </main>
    </div>

  )
}

export default App
