import { React, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [movies, updateMovies] = useState({
    initialList: [],
    movies: [],
    showresults: "",
  });
  async function fetchMovies() {
    const res = await axios.get("https://first-social.herokuapp.com/api/posts");
    const data = res.data;
    updateMovies({
      ...movies,
      initialList: data,
    });
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  const searchToggle = (e) => {
    e.preventDefault();
    if (e.currentTarget.parentElement.classList.contains("js--open")) {
      e.currentTarget.parentElement.classList.remove("js--open");
    } else {
      e.currentTarget.parentElement.classList.add("js--open");
    }
  };
  const searchHandler = (e) => {
    const searchInput = e.target;
    const value = searchInput.value.toLowerCase();
    if (movies.initialList && value.length > 2) {
      const moviesFilter = movies.initialList.filter((movie) => {
        return movie.title.toLowerCase().indexOf(value) > -1 ? true : false;
      });
      updateMovies({
        ...movies,
        movies: moviesFilter,
        showresults: moviesFilter.length > 0 ? "js--results" : "",
      });
    } else {
      updateMovies({
        ...movies,
        movies: [],
        showresults: "",
      });
    }
  };
  return (
    <div className="module-search p-1 ">
      <div className="module-search_input-container">
        <input
          id="search-value"
          className="module-search_input"
          type="text"
          placeholder="Cauta film"
          onChange={(e) => searchHandler(e)}
        />
      </div>
      <button
        className="module-search-btn p-2"
        id="search-btn"
        onClick={(e) => searchToggle(e)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <div className={`module-search_results ${movies.showresults}`}>
        <div className="module-search_results_container">
          {movies.movies.map((movie, index) => {
            return <div key={index}>{movie.title}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
