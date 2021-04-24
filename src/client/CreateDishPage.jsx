import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { useHistory } from "react-router";

export function CreateDishPage({ dishApi }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    history.push("/profile");

    alert("You added a dish!");
    await dishApi.createDish({ name, price });
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
