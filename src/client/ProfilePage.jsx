import React from "react";
import { useLoading } from "./lib/useLoading";
import { Link } from "react-router-dom";
import { Route } from "react-router";

export function ProfilePage({ loadProfile }) {
  const { loading, error, data } = useLoading(async () => await loadProfile());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>An error occurred</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <div class={"profile"}>{data.name}</div>
      {data.picture && (
        <div class={"profile"}>
          <img src={data.picture} />
        </div>
      )}
      <div id={"addDish"}>
        {data && <Link to={"/create"}>Create dish</Link>}
      </div>
      <div>{data && <Link to={"/dishes"}>Edit dish</Link>}</div>
    </div>
  );
}
