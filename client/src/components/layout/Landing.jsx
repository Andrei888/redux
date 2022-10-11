import React from "react";

function Landing() {
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <ul className="flex justify-center content-center p-10 bg-white rounded-lg">
        <li className="p-4">
          <a
            className="rounded-full border-cyan-400 border-2 bg-cyan-400 p-4 m-2"
            href="/register"
          >
            Register
          </a>
        </li>
        <li className="p-4">
          <a
            className="rounded-full border-cyan-400 border-2 bg-cyan-400 p-4 m-2 hover:red"
            href="/login"
          >
            Login
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Landing;
