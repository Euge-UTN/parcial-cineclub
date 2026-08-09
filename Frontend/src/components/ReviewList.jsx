function ReviewList({ reviews, avgScore }) {
  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h3>Reseñas</h3>

        <p className="average-score">
          Promedio:{' '}
          {avgScore !== null
            ? avgScore.toFixed(1)
            : 'Sin reseñas'}
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="no-reviews">
          Esta película todavía no tiene reseñas.
        </p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-top">
                <h4>{review.author}</h4>
                <span>{review.score}/5</span>
              </div>

              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ReviewList