function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button onClick={onSearch}>
        Buscar
      </button>
    </div>
  )
}

export default SearchBar