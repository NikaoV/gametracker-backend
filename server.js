// Importar los módulos necesarios
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Crear la aplicación Express
const app = express();

// Middleware: permiten que el servidor entienda JSON y acepte peticiones de otros orígenes
app.use(express.json());
app.use(cors());
const juegosRoutes = require("./src/routes/juegos");
app.use("/api/juegos", juegosRoutes);


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor GameTracker funcionando 🎮");
});

// Conexión a la base de datos (aún no funcional hasta que tengamos el .env)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Levantar el servidor en un puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
