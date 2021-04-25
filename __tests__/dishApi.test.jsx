import {describe, it} from "@jest/globals";

const request = require("supertest")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(require("body-parser").json())
app.use(require("../src/server/dishApi"))

describe("dishApi", () => {
    it("Can return the predefined books", async () => {
        await request(app).get("")
            .then(response => {
                expect(response.body.find(({id}) => id === 2)).toMatchObject({
                    name: "Pizza"
                })
            })
    })

    it('should create new book', async function () {
        await request(app)
            .post("").send({
                id: 2,
                name: "Sushi",
                price: "120",
            }).expect(201)
        await request(app)
            .get("")
            .then((response) => {
                expect(response.body.map(({name}) => name)).toContain("Sushi")
            })
    });

    it("can update existing books", async () => {
        const menu = (await request(app).get("/2")).body;
        const updated = {
            ...menu,
            name: "Pizza",
        };
        await request(app).put("/2").send(updated).expect(200);
        await request(app)
            .get("/2")
            .then((response) => {
                expect(response.body).toMatchObject({
                    id: 2,
                    name: "Pizza",
                });
            });
    });
})