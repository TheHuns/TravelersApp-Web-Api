export const LOADING_USER = "LOADING_USER";
export const USER_LOADED = "USER_LOADED";
export const LOGOUT = "LOGOUT";

export const login = user => async dispatch => {
  localStorage.setItem("token", user.data.login.token);
  dispatch({
    type: USER_LOADED,
    payload: user.data.login
  });
};

export const loadingUser = () => dispatch => {
  dispatch({
    type: LOADING_USER
  });
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT
  });
};
