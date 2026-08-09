function ReviewList({ reviews, avgScore }) {
  return (
    <div>
      <h3>Reseñas</h3>

      <p>
        Promedio: {avgScore !== null ? avgScore.toFixed(1) : 'Sin reseñas'}
      </p>

      {reviews.length === 0 ? (
        <p>Esta película todavía no tiene reseñas.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            <h4>{review.author}</h4>
            <p>Puntaje: {review.score}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default ReviewList