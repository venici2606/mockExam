import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { CreateDishPage } from "../src/client/CreateDishPage";

function findInputByLabel(form, label) {
  const nameLabel = [...form.querySelectorAll("label")].find((l) =>
    l.textContent.startsWith(label)
  );
  return nameLabel.querySelector("input");
}

function changeValue(input, value) {
  act(() => {
    Simulate.change(input, { target: { value } });
  });
}

function testFindInput(form, label) {
  return form
    .findAllByType("label")
    .find((p) => p.props.children.join("").startsWith(label))
    .findByType("input");
}

function testChangeValue(input, value) {
  TestRenderer.act(() => {
    input.props.onChange({ target: { value } });
  });
}

describe("create dish view", () => {
  it("test renders view", async () => {
    const createDish = jest.fn();
    global.alert = jest.fn();
    let view;
    await TestRenderer.act(async () => {
      view = TestRenderer.create(
        <MemoryRouter>
          <CreateDishPage dishApi={{ createDish: createDish }} />
        </MemoryRouter>
      );
    });
    expect(view.toJSON()).toMatchSnapshot();
    const form = view.root.findByType("form");
    testChangeValue(testFindInput(form, "Dish name"), "My Dish");
    testChangeValue(testFindInput(form, "Price"), "100");
    form.props.onSubmit({ preventDefault() {} });
    expect(createDish).toBeCalledWith({
      name: "My Dish",
      price: "100",
    });
  });

  it("renders on real DOM", async () => {
    const createDish = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <CreateDishPage dishApi={{ createDish }} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();

    const form = container.querySelector("form");
    await changeValue(findInputByLabel(form, "Dish name"), "MyDish");
    await changeValue(findInputByLabel(form, "Price"), "100");
    Simulate.submit(form);
    expect(createDish).toBeCalledWith({
      name: "MyDish",
      price: "100",
    });
  });
});
