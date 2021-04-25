const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const dishApi = require("./dishApi");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use("/api/dishes", dishApi);

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
