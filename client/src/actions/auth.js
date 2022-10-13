import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT_SUCCESS,
} from "./constants";
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
      setAlert("Registration completed", "danger", 3000);
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
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const user = {
      email,
      password,
    };
    const body = JSON.stringify(user);
    try {
      const response = await axios.post("/api/auth", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
      dispatch(setAlert("Login Successfuly", "danger", 3000));
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;

      if (errors) {
        dispatch(setAlert(errors.msg, "danger", 3000));

        dispatch({
          type: LOGIN_FAIL,
        });
      }
    }
  };
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
