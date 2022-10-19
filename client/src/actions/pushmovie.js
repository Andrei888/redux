import axios from "axios";
import { setAlert } from "./alerts";
import store from "../store";

export const pushmovie = async ({ title, text, file }) => {
  console.log("sxxxbt");
  const token = store.getState().auth.token;

  const api_key = "646972978696919";
  const cloud_name = "dgleydw5w";
  //upload image
  const signatureResponse = await axios.get("/api/get-signature");
  //if (token) {
  const formData = new FormData();
  console.log(file);
  formData.append("api_key", api_key);
  formData.append("file", file);
  formData.append("signature", signatureResponse.data.signature);
  formData.append("timestamp", signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(
    "https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (e) {
        console.log(e.loaded / e.total);
      },
    }
  );
  console.log(cloudinaryResponse.data);
  //}
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
