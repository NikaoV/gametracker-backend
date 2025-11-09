const express = require("express");
const router = express.Router();
const {
  obtenerJuegos,
  agregarJuego,
  actualizarJuego,
  eliminarJuego,
} = require("../controllers/juegosController");

// Rutas limpias:
router.get("/", obtenerJuegos);
router.post("/", agregarJuego);
router.put("/:id", actualizarJuego);
router.delete("/:id", eliminarJuego);

module.exports = router;