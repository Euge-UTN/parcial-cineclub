import { useState } from 'react'

function ReviewForm({ onReviewCreated }) {
  const [author, setAuthor] = useState('')
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!author.trim() || !score || !comment.trim()) {
      setError('Todos los campos son obligatorios')
      return
    }

    setError('')

    await onReviewCreated({
      author,
      score: Number(score),
      comment
    })

    setAuthor('')
    setScore('')
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Escribir una reseña</h3>

      <div>
        <label>Autor</label>
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      <div>
        <label>Puntaje</label>
        <select
          value={score}
          onChange={(event) => setScore(event.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>
        <label>Comentario</label>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit">
        Publicar reseña
      </button>
    </form>
  )
}

export default ReviewForm