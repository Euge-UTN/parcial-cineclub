function MovieCard({ movie, onSelect }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'Sin año'

  return (
    <div onClick={() => onSelect(movie)}>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={`Poster de ${movie.title}`}
        />
      ) : (
        <p>Sin poster</p>
      )}

      <h3>{movie.title}</h3>
      <p>Año: {year}</p>
      <p>Promedio: {movie.avgScore ?? 'Sin reseñas'}</p>
    </div>
  )
}

export default MovieCard