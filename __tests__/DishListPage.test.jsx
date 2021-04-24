import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import {DishListPage} from "../src/client/DishListPage";
import {MemoryRouter} from "react-router";

describe("dish list page", () => {
    it("show dish on dom", async () => {

        const dishApi = {
            listDishes: () => [
                {id: 1, name: "Cheeseburger"}
            ]
        };

        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(<MemoryRouter><DishListPage dishApi={dishApi}/></MemoryRouter>, container);
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual("Dish 1: Cheeseburger  kr");
    });
});