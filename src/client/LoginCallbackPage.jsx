import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

export function LoginCallbackPage({ onAccessToken }) {
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );

  const [error, setError] = useState();

  const history = useHistory();

  useEffect(() => {
    const loginState = JSON.parse(sessionStorage.getItem("loginState"));
    const { access_token, state, error } = hash;

    if (state !== loginState.state) {
      alert("Why are you here?");
      return;
    }
    if (error) {
      setError(error);
      return;
    }

    onAccessToken(access_token);
    //sessionStorage.removeItem("loginState");
    history.push("/");
  }, [hash]);

  if (error) {
    return (
      <div>
        <h1>An error occurred</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return <h1>Login callback</h1>;
}
