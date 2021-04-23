import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { fetchJson } from "./lib/http";
import { LoginPage } from "./LoginPage";
import { LoginCallbackPage } from "./LoginCallbackPage";

function useLocalStorage(key) {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key))
  );

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value]);
  return [value, setValue];
}

export function Application() {
  const [access_token, setAccess_token] = useLocalStorage("access_token");

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "186464366390-duk52tjp6srhuc4jdhh7mvhi07m1s40h.apps.googleusercontent.com",
    scope: "openid email profile",
  };

  async function loadProfile() {
    return fetchJson("/api/profile", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }

  return (
      <div id={"container"}><BrowserRouter>
        <Switch>
          <Route exact path={"/"} id={"container"}>
            <h1>Welcome to the PG6301 cantine</h1>
            <div id={"lProfile"}><Link to={"/profile"}>Profile</Link></div>
            <div id={"lLogin"}><Link to={"/login"}>Login</Link></div>
          </Route>

          <Route path={"/profile"}>
            <ProfilePage loadProfile={loadProfile}/>
            <ul>
              <li>
                <Link to={"/create"}>Create dish</Link>
              </li>
              <li>
                <Link to={"/books"}>List dish</Link>
              </li>
            </ul>
          </Route>
          <Route exact path={"/login"}>
            <LoginPage identityProvider={googleIdentityProvider}/>
          </Route>
          <Route path={"/login/callback"}>
            <LoginCallbackPage
                identityProvider={googleIdentityProvider}
                onAccessToken={(access_token) => setAccess_token(access_token)}
            />
          </Route>
          <Route path={"/create"}>
            {/*<CreateBookPage />*/}
            <h1>Create dish</h1>
          </Route>
          <Route exact path={"/books"}>
            {/*<BookListPage bookApi={bookApi} />*/}
            <h1>List dish</h1>
          </Route>
          <Route path={"/books/:id/edit"}>
            {/*<EditBookPage bookApi={bookApi} />*/}
            <h1>Edit dish</h1>
          </Route>

          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </BrowserRouter></div>
  );
}
