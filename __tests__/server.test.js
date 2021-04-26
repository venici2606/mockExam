const request = require("supertest");
const { createApp } = require("../src/server/server");

describe("server api", () => {
  const app = createApp();

  it("lets user create dish", async () => {
    await request(app)
      .post("/api/dishes")
      .send({ name: "Dish name", price: 200 })
      .set("Content-Type", "application/json");

    const dishes = await request(app).get("/api/dishes");
    expect(dishes.body.map((b) => b.name)).toContain("Dish name");
  });

  it("lets user fetch a single dish", async () => {
    const dishes = (await request(app).get("/api/dishes")).body;
    const { id, name, price } = dishes[0];

    const dish = (await request(app).get(`/api/dishes/${id}`)).body;
    expect(dish).toMatchObject({ id, name, price });
  });

  it("lets user update single dish", async () => {
    const { id, name, price } = (await request(app).get("/api/dishes")).body[0];

    const newName = "New " + name;
    await request(app)
      .put(`/api/dishes/${id}`)
      .send({ name: newName, price })
      .set("Content-Type", "application/json");

    const updatedDish = (await request(app).get(`/api/dishes/${id}`)).body;
    expect(updatedDish).toMatchObject({ name: newName });
  });
});
