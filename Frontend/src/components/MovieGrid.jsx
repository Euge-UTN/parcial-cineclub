import MovieCard from './MovieCard'

function MovieGrid({ movies, onSelect }) {
  if (movies.length === 0) {
    return <p>No se encontraron películas.</p>
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default MovieGrid