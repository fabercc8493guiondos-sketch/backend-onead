const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// simulación de base de datos
let users = {};

// crear usuario
app.post("/login", (req, res) => {
    const { userId } = req.body;

    if (!users[userId]) {
        users[userId] = { freeTime: 0 };
    }

    res.json(users[userId]);
});

// obtener datos
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.json(users[userId] || { freeTime: 0 });
});

// guardar datos
app.post("/user/:id", (req, res) => {
    const userId = req.params.id;
    users[userId] = req.body;
    res.json({ message: "Guardado" });
});

// Definimos el puerto: usa el que nos dé Render (process.env.PORT)
// o el 3000 si estamos en nuestra PC local.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
