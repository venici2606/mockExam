const request = require("supertest");
const express = require("express");

const app = express();
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
});
