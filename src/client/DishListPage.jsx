import React from "react";
import { LoadingView } from "./components/LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./components/ErrorView";

export function DishListPage({ dishApi }) {
  const { data: dishes, error, loading, reload } = useLoading(
    async () => await dishApi.listDishes()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !dishes) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>Menu</h1>
      {dishes.map(({ id, name, price }) => (
        <li key={id}>
          <Link to={`/dishes/${id}/edit`}>
            Dish {id}: {name} {price} kr
          </Link>
        </li>
      ))}
      <p>
        <i>You can click on the dishes to change them!</i>
      </p>
    </>
  );
}
