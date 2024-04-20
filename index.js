const express = require('express');
const app = express();
const port = 3000;
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Cara" },
];
app.use(express.json());
app.get("/", (req, res) => {
    res.status(400).send("Hello World!");
});


//--- users roustes
app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send("The user with the given ID was not found.");
    }
    res.json(user);
});

app.post("/users", (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(user);
    res.json(user);
});

app.put("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send("The user with the given ID was not found.");
    }
    user.name = req.body.name;
    res.json(user)
});

app.delete("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send("The user with the given ID was not found.");
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json(user);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

