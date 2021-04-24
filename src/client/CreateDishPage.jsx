import React, { useState } from "react";
import { InputField } from "./components/InputField";

export function CreateDishPage({ dishApi }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function submit(e) {
    e.preventDefault();
    await dishApi.createDish({ name, price });
    alert("You added a dish!");
  }

  return (
    <form onSubmit={submit}>
      <h1>Create a new dish</h1>
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
