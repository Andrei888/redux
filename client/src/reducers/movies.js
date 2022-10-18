import { ADD_MOVIE, REMOVE_MOVIE } from "../actions/constants";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_MOVIE:
      return [...state, payload];
    case REMOVE_MOVIE:
      return state.filter((movie) => movie.name !== payload.name);
    default:
      return state;
  }
}
