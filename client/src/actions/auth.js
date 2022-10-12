import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./constants";
import { setAlert } from "./alerts";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const user = {
      name,
      email,
      password,
    };
    const body = JSON.stringify(user);
    try {
      const response = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;

      if (errors) {
        dispatch(setAlert(errors.msg, "danger", 3000));

        dispatch({
          type: REGISTER_FAIL,
        });
      }
    }
  };
