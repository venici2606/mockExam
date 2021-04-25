import { Application } from "../src/client/Application";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "@jest/globals";

describe("application", () => {
  it("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Application />
      </MemoryRouter>,
      container
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Welcome to the PG6301 cantine"
    );
  });

  it("can navigate to profile page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
    const createChatLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Profile"
    );
    await act(async () => {
      await createChatLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "An error occurred"
    );
  });

  it("can navigate to login page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
    const createLoginLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Login"
    );
    await act(async () => {
      await createLoginLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h2").textContent).toEqual("Login");
  });

  it("can navigate to chat page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
    const createChatLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Chat"
    );
    await act(async () => {
      await createChatLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Please log in");
  });
});
