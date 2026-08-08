import { useState } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [view, setView] = useState('search')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <div>
      <h1>CineClub</h1>

      {view === 'search' && (
        <div>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={searchMovies}
          />

          {loading && <p>Cargando...</p>}

          {error && <p>{error}</p>}

          <p>Resultados encontrados: {movies.length}</p>

          <button onClick={() => setView('detail')}>
            Ir al detalle
          </button>
        </div>
      )}

      {view === 'detail' && (
        <div>
          <p>Vista de detalle</p>

          <button onClick={() => setView('search')}>
            Volver a búsqueda
          </button>
        </div>
      )}
    </div>
  )
}

export default App