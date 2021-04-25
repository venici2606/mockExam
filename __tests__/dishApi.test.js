const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/dishApi"));

describe("dishes api", () => {
  it("can list initial dishes", async () => {
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          name: "Pizza",
          price: "119",
        });
      });
  });

  it("can add a new dish", async () => {
    await request(app)
      .post("/")
      .send({
        name: "New dish",
        price: 100,
      })
      .expect(201);
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.body.map(({ name }) => name)).toContain("New dish");
      });
  });

  it("can update existing dishes", async () => {
    const book = (await request(app).get("/2")).body;
    const updated = {
      ...book,
      price: "99",
    };
    await request(app).put("/2").send(updated).expect(200);
    await request(app)
      .get("/2")
      .then((response) => {
        expect(response.body).toMatchObject({
          id: 2,
          price: "99",
        });
      });
  });
});
