import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import movies from "./movies";

export default combineReducers({ alert, auth, movies });
