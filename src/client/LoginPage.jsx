import React from "react";
import { fetchJson } from "./lib/http";

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export function LoginPage({ identityProvider }) {
  const { discoveryURL, client_id, scope } = identityProvider;

  async function handleLogin() {
    const { authorization_endpoint } = await fetchJson(discoveryURL);

    const state = randomString(30);
    const loginState = { state };
    sessionStorage.setItem("loginState", JSON.stringify(loginState));

    const params = {
      client_id,
      response_type: "token", // Implicit flow
      scope,
      redirect_uri: window.location.origin + "/login/callback",
      state,
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }

  return (
    <div id={"btnLogin"}>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
