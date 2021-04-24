import { EditDishPage } from "../src/client/EditDishPage";
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { act, Simulate } from "react-dom/test-utils";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("edit dish page", () => {
  it("can show information about an existing dish", async () => {
    const getDish = () => ({
      name: "Pizza",
      price: "119",
    });
    const container = await renderForTest(
      <EditDishPage dishApi={{ getDish }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit existing dish (Pizza)"
    );
  });

  it("can show loading screen", async () => {
    const getDish = () => new Promise((resolve) => {});

    const container = await renderForTest(
      <EditDishPage dishApi={{ getDish }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual("Loading ...");
  });

  it("can show error message", async () => {
    const getDish = () => {
      throw new Error("Failed to load");
    };

    const container = await renderForTest(
      <EditDishPage dishApi={{ getDish }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });

  it("updates server on submit", async () => {
    const dish = {
      name: "Italian salad",
      price: "99",
    };
    const getDish = () => dish;
    const updateDish = jest.fn();
    const container = await renderForTest(
      <EditDishPage dishApi={{ getDish, updateDish }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "Salad bowl" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(updateDish).toBeCalledWith(undefined, {
      ...dish,
      name: "Salad bowl",
    });
  });
});
