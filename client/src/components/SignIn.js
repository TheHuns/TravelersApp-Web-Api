import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout, loadingUser } from "../store/actions/users";

export default function SignIn() {
  const dispatch = useDispatch();

  const { loading, user } = useSelector(state => state.users);

  const { isAuthenticated, loginWithRedirect, logoutAuth0 } = useAuth0();

  if (loading) return <div className="sign-in">Fetching User...</div>;

  if (user)
    return (
      <div className="sign-in">
        <div className="user-info">
          <p>Welcome, {user.name}!</p>
          <button
            onClick={() => {
              logoutAuth0();
              dispatch(logout());
            }}
          >
            Log out
          </button>
        </div>
      </div>
    );

  return (
    <div className="sign-in">
      {!isAuthenticated && (
        <button
          onClick={() => {
            loginWithRedirect({});
            dispatch(loadingUser());
          }}
        >
          Log in
        </button>
      )}
    </div>
  );
}
