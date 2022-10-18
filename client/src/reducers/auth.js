import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT_SUCCESS,
} from "../actions/constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
}
