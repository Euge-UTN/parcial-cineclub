function MovieCard({ movie, onSelect }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'Sin año'

  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={`Poster de ${movie.title}`}
        />
      ) : (
        <div className="no-poster">
          <p>Sin poster</p>
        </div>
      )}
    <div className="movie-info"></div>
      <h3>{movie.title}</h3>
      <p>{year}</p>
      <p className="movie-score">
        {movie.avgScore != null ? 
          `Promedio: ${Number(movie.avgScore).toFixed(1)}`
          : 'Sin reseñas'}
      </p>
    </div>
  )
}

export default MovieCard