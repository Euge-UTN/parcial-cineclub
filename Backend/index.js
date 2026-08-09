require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const reviews = []

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 3001

app.get('/api/test', (request, response) => {
  response.json({ message: 'Backend funcionando correctamente' })
})

app.get('/api/movies/search', async (request, response) => {
  const query = request.query.q

  if (!query) {
  return response.status(400).json({
    error: 'El parámetro q es obligatorio'
  })
}

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  })

  const data = await result.json()

  if (!result.ok || data.success === false) {
  return response.status(404).json({
    error: 'Película no encontrada'
  })
 }
 
 const moviesWithScore = data.results.map((movie) => {
const movieReviews = reviews.filter(
review => review.tmdbId === movie.id
)

const avgScore =
movieReviews.length > 0
? movieReviews.reduce((sum, review) => sum + review.score, 0) /
movieReviews.length
: null

return {
...movie,
avgScore
}
})

data.results = moviesWithScore

response.json(data)

})

app.get('/api/movies/:tmdbId', async (request, response) => {
  const tmdbId = request.params.tmdbId

  const url = `https://api.themoviedb.org/3/movie/${tmdbId}`

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  })

  const data = await result.json()

  if (!result.ok || data.success === false) {
    return response.status(404).json({
      error: 'Película no encontrada'
    })
  }

  const movieReviews = reviews.filter(
    review => review.tmdbId === Number(tmdbId)
  )

  const avgScore =
    movieReviews.length > 0
      ? movieReviews.reduce((sum, review) => sum + review.score, 0) /
        movieReviews.length
      : null

  response.json({
    ...data,
    reviews: movieReviews,
    avgScore
  })
})

app.post('/api/movies/:tmdbId/reviews', (request, response) => {
  const tmdbId = Number(request.params.tmdbId)
  const { author, score, comment } = request.body

  if (!author || !score || !comment) {
    return response.status(400).json({
      error: 'author, score y comment son obligatorios'
    })
  }

  if (typeof score !== 'number' || score < 1 || score > 5) {
    return response.status(400).json({
      error: 'score debe ser un número entre 1 y 5'
    })
  }

  const review = {
    id: Date.now(),
    tmdbId,
    author,
    score,
    comment
  }

  reviews.push(review)

  response.status(201).json(review)
})

app.delete('/api/reviews/:reviewId', (request, response) => {
  const reviewId = Number(request.params.reviewId)

  const reviewIndex = reviews.findIndex(
    review => review.id === reviewId
  )

  if (reviewIndex === -1) {
    return response.status(404).json({
      error: 'Reseña no encontrada'
    })
  }

  const deletedReview = reviews.splice(reviewIndex, 1)[0]

  response.json({
    message: 'Reseña eliminada correctamente',
    review: deletedReview
  })
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})