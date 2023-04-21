import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'

function useSearch(){
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  
  //comprobar las validaciones con un useEffect
  useEffect(() =>{
    if(isFirstInput){
      isFirstInput.current = query === ''
      return
    }


    if(query === ''){
      setError('No se puede realizar una busqueda vacía')
      return
    }
    
    if(query.length < 3){
      setError('Necesita al menos 3 caracteres')
      return
    }

    setError(null)
  }, [query])
  return {query, setQuery, error}
}


function App() {
  const {query, setQuery, error} = useSearch()
  const {movies , getMovies} = useMovies({query})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (

    <div>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
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
