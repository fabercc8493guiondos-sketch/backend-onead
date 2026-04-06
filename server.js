const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 "Base de datos" temporal en memoria
// Guardará los datos así: { "id123": { freeTime: 10 }, "id456": { freeTime: 5 } }
let users = {};

// 🟢 Prueba básica
app.get("/", (req, res) => {
    res.send("Backend Multi-Usuario Funcionando 🚀");
});

// 🔐 LOGIN: Crea al usuario si no existe
app.post("/login", (req, res) => {
    const { userId } = req.body;
    if (!users[userId]) {
        users[userId] = { freeTime: 0 };
        console.log(`✨ Nuevo usuario creado: ${userId}`);
    }
    res.json({ message: "Usuario listo" });
});

// 📥 OBTENER datos de un usuario específico
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    const userData = users[userId] || { freeTime: 0 };
    res.json(userData);
});

// 📤 ACTUALIZAR datos de un usuario específico
app.post("/user/:id", (req, res) => {
    const userId = req.params.id;
    users[userId] = req.body;
    res.json({ message: "Progreso guardado" });
});

// 📡 Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

