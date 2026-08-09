import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

function MovieDetail({
  movie,
  onBack,
  reviews,
  avgScore,
  onReviewCreated
}) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null

  return (
    <div>
      <button onClick={onBack}>
        Volver a búsqueda
      </button>

      {posterUrl && (
        <img
          src={posterUrl}
          alt={`Poster de ${movie.title}`}
        />
      )}

      <h2>{movie.title}</h2>

      <p>
        Año: {movie.release_date
          ? movie.release_date.substring(0, 4)
          : 'Sin año'}
      </p>

      <p>
        {movie.overview || 'Sin descripción disponible'}
      </p>

      <ReviewList
        reviews={reviews}
        avgScore={avgScore}
      />

      <ReviewForm onReviewCreated={onReviewCreated}/>

    </div>
  )
}

export default MovieDetail