const SearchForm = ({ handleSubmit, handleChange, searchTerm }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        onChange={handleChange}
        value={searchTerm}
        id="searchBar"
        placeholder="Enter any GitHub user here"
      />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;
