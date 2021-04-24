import React from "react";
import { LoadingView } from "./components/LoadingView";
import { useLoading } from "./useLoading";
import { ErrorView } from "./components/ErrorView";

export function DishList({ dishApi }) {
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
      <h3>
        <i>Menu</i>
      </h3>
      {dishes.map(({ id, name, price }) => (
        <li key={id}>
          Dish {id}: {name} {price} kr.
        </li>
      ))}
    </>
  );
}
