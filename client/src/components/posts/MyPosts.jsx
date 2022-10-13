import React from "react";
import { Link } from "react-router-dom";

function MyPosts() {
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <div>
          <Link to="/filme/1">Post 1</Link>
        </div>
        <div>
          <Link to="/filme/2">Post 2</Link>
        </div>
        <div>
          <Link to="/filme/3">Post 3</Link>
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
