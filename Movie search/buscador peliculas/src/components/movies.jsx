
function ListOffMovies({movies}){
    return (
        <ul className='movies'>
        {
          movies.map(movie =>(
            <li key={movie.id} className='movie'>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title}></img>
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
  
const hasMovies = mappedMovies?.length>0

    return (
        hasMovies
            ? <ListOffMovies movies={mappedMovies}/>
            : <NoMoviesResults/> 
    )
}