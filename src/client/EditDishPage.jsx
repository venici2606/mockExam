import React, { useState } from "react";
import { LoadingView } from "./components/LoadingView";
import { InputField } from "./components/InputField";
import { useLoading } from "./lib/useLoading";
import { ErrorView } from "./components/ErrorView";
import { useHistory, useParams } from "react-router";

function EditDishForm({ dish, onSubmit }) {
  const [name, setName] = useState(dish.name);
  const [price, setPrice] = useState(dish.price);
  const history = useHistory();

  async function submit(e) {
    onSubmit(e, { name, price });
    history.push("/dishes");

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

  const { loading, error, data: dish, reload } = useLoading(
    async () => await dishApi.getDish(id),
    [id]
  );

  async function handleSubmit(e, { name, price }) {
    e.preventDefault();
    await dishApi.updateDish(id, { name, price });

    alert("You changed the dish!");
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !dish) {
    return <LoadingView />;
  }

  return <EditDishForm dish={dish} onSubmit={handleSubmit} />;
}
