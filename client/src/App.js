import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Posts from "./components/posts/Posts";
import Navbar from "./components/layout/Navbar";
import PostPage from "./components/posts/PostPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
