import { LOADING_USER, USER_LOADED, LOGOUT } from "../actions/users";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  loading: false
};

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_USER:
      return { ...state, loading: true };

    case USER_LOADED:
      return { ...state, user: payload, loading: false };

    case LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};
