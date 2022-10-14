import axios from "axios";
import { setAlert } from "./alerts";
import store from "../store";

const pushmovie = async ({ title, text }) => {
  console.log("sxxxbt");
  const token = store.getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token ? token : "",
    },
  };
  const movie = {
    title,
    text,
  };
  const body = JSON.stringify(movie);
  console.log("sbt", movie);
  try {
    const response = await axios.post("/api/posts", body, config);
    console.log(response);
    setAlert("Film Adaugat", "danger", 3000);
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;

    if (errors) {
    }
  }
};

export default pushmovie;
