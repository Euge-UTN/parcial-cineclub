import { useState } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'
import MovieGrid from './components/MovieGrid'
import MovieDetail from './components/MovieDetail'
import ReviewList from './components/ReviewList'

function App() {
  const [view, setView] = useState('search')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [avgScore, setAvgScore] = useState(null)

  const searchMovies = async () => {
    if (!query.trim()) {
      setError('Ingresá una película para buscar')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/movies/search?q=${encodeURIComponent(query)}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al buscar películas')
      }

      setMovies(data.results)
    } catch (error) {
      setError(error.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const createReview = async (reviewData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/movies/${selectedMovie.id}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error al crear la reseña')
    }

    setReviews((currentReviews) => {
      const updatedReviews = [...currentReviews, data]

      const newAvgScore =
        updatedReviews.reduce(
          (sum, review) => sum + review.score,
          0
        ) / updatedReviews.length

      setAvgScore(newAvgScore)

      return updatedReviews
    })
  } catch (error) {
    console.error(error)
  }
}

  return (
  <div className="app">
    <header className="app-header">
      <h1>CineClub</h1>
    </header>

    {view === 'search' && (
      <main className="search-page">
        <h2>Buscar películas</h2>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={searchMovies}
        />

        {loading && <p className="loading">Cargando...</p>}

        {error && <p className="error-message">{error}</p>}

        <p className="results-count">
          Resultados encontrados: {movies.length}
        </p>

        <MovieGrid
          movies={movies}
          onSelect={async (movie) => {
            setSelectedMovie(movie)
            setView('detail')

            try {
              const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/movies/${movie.id}`
              )

              const data = await response.json()

              if (!response.ok) {
                throw new Error(
                  data.error || 'Error al obtener la película'
                )
              }

              setReviews(data.reviews)
              setAvgScore(data.avgScore)
            } catch (error) {
              setReviews([])
              setAvgScore(null)
              console.error(error)
            }
          }}
        />
      </main>
    )}

    {view === 'detail' && selectedMovie && (
      <MovieDetail
        movie={selectedMovie}
        onBack={() => setView('search')}
        reviews={reviews}
        avgScore={avgScore}
        onReviewCreated={createReview}
      />
    )}
  </div>
)
}

export default App