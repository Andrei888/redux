import React, { useEffect, setState } from "react";

function Search() {
  const [searchList, setSearchList] = setState();
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
