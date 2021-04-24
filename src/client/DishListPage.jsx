import React from "react";
import { LoadingView } from "./components/LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./components/ErrorView";

export function DishListPage({ dishApi, loadProfile, msg }) {
  const { data: dishes, error, loading, reload } = useLoading(
    async () => await dishApi.listDishes()
  );

  const message = msg;
  const { data } = useLoading(async () => await loadProfile());

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !dishes) {
    return <LoadingView />;
  }

  /* If login add link */
  function output(data, name, id, price) {
    if (data)
      return (
        <Link to={`/dishes/${id}/edit`}>
          Dish {id}: {name} {price} kr
        </Link>
      );
    else return `Dish ${id}: ${name} ${price} kr`;
  }

  /*  return (
    <>
      <h1>Menu</h1>
      {dishes.map(({ id, name, price }) => (
        <li key={id}>
          {/!*          <Link to={`/dishes/${id}/edit`}>
            Dish {id}: {name} {price} kr
          </Link>*!/}
          {output(data, name, id, price)}
        </li>
      ))}
      <p>
        <i>You can click on the dishes to change them!</i>
      </p>
    </>
  );*/

  return (
    <div>
      <h3>Menu</h3>
      {dishes.map(({ id, name, price }) => (
        <li key={id}>{output(data, name, id, price)}</li>
      ))}
      <p>{message}</p>
    </div>
  );
}
