function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="search-control">
      <span>Search products</span>
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Try dumbbells"
      />
    </label>
  );
}

export default SearchBar;
