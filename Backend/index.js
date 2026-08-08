require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()

const reviews = []

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

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})