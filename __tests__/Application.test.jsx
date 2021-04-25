import { Application } from "../src/client/Application";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "@jest/globals";

describe("application", () => {
  xit("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Application />
      </MemoryRouter>,
      container
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Dish application"
    );
  });

  it("can navigate to create dish page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
    const createDishLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Add a dish"
    );
    await act(async () => {
      await createDishLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Create new dish"
    );
  });
});
