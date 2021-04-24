import { EditDishPage } from "../src/client/EditDishPage";
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

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
});
