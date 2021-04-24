const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();

const dishes = [
  {
    id: 1,
    name: "Cheeseburger",
    price: "239",
  },
  {
    id: 2,
    name: "Pizza",
    price: "119",
  },
];
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/dishes", (req, res) => {
  console.log(dishes);
  res.json(dishes);
});

app.get("/api/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dish = dishes.find((b) => b.id === id);
  console.log({ dish });
  res.json(dish);
});

app.put("/api/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dishIndex = dishes.findIndex((b) => b.id === id);
  const { name, price } = req.body;
  dishes[dishIndex] = { name, price, id };
  res.status(200).end();
});

app.post("/api/dishes", (req, res) => {
  const { name, price } = req.body;
  console.log(req.body);
  dishes.push({ name, price, id: dishes.length + 1 });
  res.status(201).end();
});

const discoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.use(async (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (Authorization) {
    const { userinfo_endpoint } = await fetchJson(discoveryURL);
    req.userinfo = await fetchJson(userinfo_endpoint, {
      headers: {
        Authorization,
      },
    });
  }
  next();
});

app.get("/api/profile", async (req, res) => {
  if (!req.userinfo) {
    return res.send(401);
  }
  return res.json(req.userinfo);
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  next();
});

const server = app.listen(3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
