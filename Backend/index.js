require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()

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

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})