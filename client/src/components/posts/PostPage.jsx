import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

const PostPage = ({ setAlert }) => {
  const params = useParams();
  const [post, setPosts] = useState([]);
  async function fetchData() {
    try {
      const url = "/api/posts/" + params.postId;
      const res = await axios.get(url);
      const data = res.data;
      setPosts(data);
      console.log(data);
      setAlert("Filme Incarcate", "danger", 3000);
    } catch (error) {
      console.log(error);
      const errors = error.posts.data.errors;

      if (errors) {
        setAlert(errors.msg, "danger", 3000);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <div className="posts-container">
          <div
            className="post-card rounded border-2 border-cyan-400 p-4 mb-4 flex"
            key={post.id}
          >
            <div className="mr-4">
              <div
                className="post-card_cover w-24 h-24"
                //style={{ backgroundImage: `url(${post.image.url})` }}
              ></div>
            </div>
            <div>
              <h2 className="post-card_title">{post.title}</h2>
              <p className="post-card_body">{post.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(PostPage);
