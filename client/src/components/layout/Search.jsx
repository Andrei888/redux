import { React, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [searchList, setSearchList] = useState([]);
  async function fetchMovies() {
    const res = await axios.get("/api/posts");
    const data = res.data;
    setSearchList(data);
    console.log(searchList);
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
    const value = searchInput.value;
    console.log(value);
    if (searchList && value.length > 2) {
      console.log(searchList);
      searchList.filter((movie) => {
        console.log(movie);
        return movie.indexOf(value) > -1 ? true : false;
      });
    }
  };
  return (
    <div className="module-search p-2">
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
      <div className="module-search_results"></div>
    </div>
  );
}

export default Search;
