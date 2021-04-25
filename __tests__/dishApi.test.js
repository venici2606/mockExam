const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/dishApi"));

describe("dish API", () => {
  it("can return the predefined dishes", async () => {
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          name: "Pizza",
        });
      });
  });

  it("can create a new dish", async () => {
    await request(app)
      .post("")
      .send({
        name: "Fish",
        price: "200",
      })
      .expect(201);
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.map(({ name }) => name)).toContain("Fish");
      });
  });
});
