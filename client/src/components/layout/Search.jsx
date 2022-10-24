import { React, useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [searchList, setSearchList] = useState();
  async function fetchMovies() {
    const res = await axios.get("/api/posts");
    setSearchList(res.data);
    console.log(searchList);
  }
  useEffect(() => {
    fetchMovies();
  });
  return <div>Search</div>;
}

export default Search;
