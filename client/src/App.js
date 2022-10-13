import { Route, Routes } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Posts from "./components/posts/Posts";
import Navbar from "./components/layout/Navbar";
import PostPage from "./components/posts/PostPage";
import MyPosts from "./components/posts/MyPosts";
import Landing from "./components/layout/Landing";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import Logout from "./components/auth/Logout";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/filme/:postId" element={<PostPage />} />
          <Route path="/filme" element={<Posts />} />
          <Route path="/filmele-mele" element={<MyPosts />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
