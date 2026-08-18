import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

function MovieDetail({
  movie,
  onBack,
  reviews,
  avgScore,
  onReviewCreated,
  onDeleteReview
}) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null

  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}>
        Volver a búsqueda
      </button>

      <div className="movie-detail">
        <div className="detail-poster">
          {posterUrl && (
            <img
              src={posterUrl}
              alt={`Poster de ${movie.title}`}
            />
          )}
        </div>

        <div className="detail-info">
          <h2>{movie.title}</h2>

          <p className="detail-year">
            {movie.release_date
              ? movie.release_date.substring(0, 4)
              : 'Sin año'}
          </p>

          <p className="overview">
            {movie.overview || 'Sin descripción disponible'}
          </p>
        </div>
      </div>

      <ReviewList
        reviews={reviews}
        avgScore={avgScore}
        onDeleteReview={onDeleteReview}
      />

      <ReviewForm onReviewCreated={onReviewCreated} />
    </div>
  )
}

export default MovieDetail