const express = require("express")
const dishApi = express.Router()


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


dishApi.get("", (req, res) => {
    console.log(dishes);
    res.json(dishes);
});

dishApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dish = dishes.find((b) => b.id === id);
    console.log({ dish });
    res.json(dish);
});

dishApi.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dishIndex = dishes.findIndex((b) => b.id === id);
    const { name, price } = req.body;
    dishes[dishIndex] = { name, price, id };
    res.status(200).end();
});

dishApi.post("", (req, res) => {
    const { name, price } = req.body;
    console.log(req.body);
    dishes.push({ name, price, id: dishes.length + 1 });
    res.status(201).end();
});


module.exports = dishApi