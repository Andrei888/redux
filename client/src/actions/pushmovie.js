import axios from "axios";
import { setAlert } from "./alerts";
import store from "../store";

export const pushmovie = async ({ title, text, url }) => {
  console.log("sxxxbt");
  const token = store.getState().auth.token;
  if (token) {
    const formData = new FormData();
    console.log(url);
    formData.append("file", url[0]);
    formData.append("upload_present", "dgleydw5w");
    const responseTest = await axios.post(
      "https://api.cloudinary.com/v1_1/dgleydw5w/image/upload",
      formData
    );
    console.log(responseTest);
  }
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
