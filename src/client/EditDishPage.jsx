import React, { useState } from "react";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";
import {useParams} from "react-router";

function EditDishForm({ dish }) {
  const [name, setName] = useState(dish.name);
  const [price, setPrice] = useState(dish.price);

  async function submit(e) {
    e.preventDefault();
    await fetch(`/api/dishes/${dish.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("You changed the dish!");
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit existing dish ({name})</h1>
      <InputField label={"Dish name"} value={name} onChangeValue={setName} />
      <InputField
        label={"Price"}
        value={price}
        onChangeValue={setPrice}
        type={"number"}
      />
      <button>Submit</button>
    </form>
  );
}

export function EditDishPage({ dishApi }) {
  const { id } = useParams();

  const { loading, error, data, reload } = useLoading(
    async () => await dishApi.getDish(id),
    [id]
  );

  if (error) {
    return <ErrorView error={error} reload={reload()} />;
  }

  if (loading || !data) {
    return <LoadingView />;
  }

  return <EditDishForm dish={data} />;
}
