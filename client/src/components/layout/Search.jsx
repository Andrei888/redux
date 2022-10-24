import { React, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [searchList, setSearchList] = useState();
  async function fetchMovies() {
    const res = await axios.get("/api/posts");
    setSearchList(res.data);
    console.log(searchList);
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  const searchHandler = (e) => {
    e.preventDefault();
    if (e.target.parentElement.parentElement.classList.contains("js--open")) {
      const value = e.target.value;
      if (searchList && value.length > 2) {
        searchList.filter((movie) => {
          console.log(movie);
          return movie.indexOf(value) > -1 ? true : false;
        });
      }
    } else {
      e.target.parentElement.parentElement.classList.add("js--open");
    }
  };
  return (
    <div className="module-search p-2">
      <div className="module-search_input-container">
        <input
          className="module-search_input"
          type="text"
          placeholder="Cauta film"
        />
      </div>
      <button className="module-search-btn" onClick={(e) => searchHandler(e)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <div className="module-search_results"></div>
    </div>
  );
}

export default Search;
