import responseMovies from '../mocks/results.json'
import withoutResults from '../mocks/no-result.json'

const movies = responseMovies.Search
const hasMovies = movies?.length>0

function ListOffMovies({movies}){
    return (
        <ul>
        {
          movies.map(movie =>(
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.Title}></img>
            </li>
          ))
          
          
        }
        </ul>
    )
}

function NoMoviesResults(){
    return (
        <p>No se cuentran películas para esta búsqueda</p>
    )
}

export function Movies({mappedMovies}){
    return (
        hasMovies
            ? <ListOffMovies movies={mappedMovies}/>
            : <NoMoviesResults/> 
    )
}