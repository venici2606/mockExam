import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { fetchJSON, fetchJson, postJSON } from "./lib/http";
import { LoginPage } from "./LoginPage";
import { LoginCallbackPage } from "./LoginCallbackPage";
import { CreateDishPage } from "./CreateDishPage";
import { DishListPage } from "./DishListPage";
import { EditDishPage } from "./EditDishPage";
import { DishList } from "./DishList";

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
  const dishApi = {
    listDishes: async () => await fetchJSON("/api/dishes"),
    getDish: async (id) => await fetchJSON(`/api/dishes/${id}`),
    createDish: async ({ name, price }) => {
      return postJSON("/api/dishes", {
        json: { name, price },
        method: "POST",
      });
    },
    updateDish: async (id, { name, price }) =>
      postJSON(`/api/dishes/${id}`, {
        json: { name, price },
        method: "PUT",
      }),
  };

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
    <div id={"container"}>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} id={"container"}>
            <h1>Welcome to the PG6301 cantine</h1>
            <div id={"lProfile"}>
              <Link to={"/profile"}>Profile</Link>
            </div>
            <div id={"lLogin"}>
              <Link to={"/login"}>Login</Link>
            </div>

            <DishListPage dishApi={dishApi} />
            {/*<DishList dishApi={dishApi} />*/}
          </Route>

          <Route path={"/profile"}>
            <ProfilePage loadProfile={loadProfile} />
          </Route>
          <Route exact path={"/login"}>
            <LoginPage identityProvider={googleIdentityProvider} />
          </Route>
          <Route path={"/login/callback"}>
            <LoginCallbackPage
              identityProvider={googleIdentityProvider}
              onAccessToken={(access_token) => setAccess_token(access_token)}
            />
          </Route>
          <Route path={"/create"}>
            <CreateDishPage dishApi={dishApi} />
          </Route>
          <Route exact path={"/dishes"}>
            <DishListPage
              loadProfile={loadProfile}
              dishApi={dishApi}
              msg={"You can click on the dishes to change them!"}
            />
          </Route>
          <Route path={"/dishes/:id/edit"}>
            <EditDishPage dishApi={dishApi} />
          </Route>

          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
