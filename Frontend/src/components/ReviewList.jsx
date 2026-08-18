function ReviewList({ reviews, avgScore }) {
  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h3>Reseñas</h3>

        <p className="average-score">
          {avgScore !== null ? (
           <>
            {'★'.repeat(Math.round(avgScore))}
            {'☆'.repeat(5 - Math.round(avgScore))}
            <span>{avgScore.toFixed(1)}</span>
          </>
         ) : (
           'Sin reseñas'
         )}
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
                <span className="review-stars">
                  {'★'.repeat(review.score)}
                  {'☆'.repeat(5 - review.score)}
                </span>
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