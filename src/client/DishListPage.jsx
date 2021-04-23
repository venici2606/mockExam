import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

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
      <h1>List dishes</h1>
      {dishes.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/dishes/${id}/edit`}>{name}</Link>
        </li>
      ))}
    </>
  );
}
