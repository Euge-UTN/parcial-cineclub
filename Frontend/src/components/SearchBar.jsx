function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar una película..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch()
          }
        }}
      />

      <button onClick={onSearch}>
        Buscar
      </button>
    </div>
  )
}

export default SearchBar
