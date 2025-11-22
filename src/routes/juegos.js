const express = require("express");
const router = express.Router();
const Juego = require("../models/juego"); // tu modelo de MongoDB

// ============================
// JUEGOS
// ============================

// GET: obtener todos los juegos
router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: crear un nuevo juego
router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.json(nuevoJuego);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: actualizar un juego completo
router.put("/:id", async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!juego) return res.status(404).send("Juego no encontrado");
    res.json(juego);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: eliminar un juego
router.delete("/:id", async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) return res.status(404).send("Juego no encontrado");
    res.json({ mensaje: "Juego eliminado", juego });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// RESEÑAS
// ============================

// POST: agregar o actualizar reseña de un juego existente
router.post("/:id/reviews", async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).send("Juego no encontrado");

    juego.reseña = req.body.reseña;
    juego.puntuacion = req.body.puntuacion;
    await juego.save();

    res.json(juego);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: actualizar reseña existente
router.put("/:id/reviews", async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).send("Juego no encontrado");

    if (req.body.reseña !== undefined) juego.reseña = req.body.reseña;
    if (req.body.puntuacion !== undefined)
      juego.puntuacion = req.body.puntuacion;

    await juego.save();
    res.json(juego);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: eliminar reseña de un juego
router.delete("/:id/reviews", async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).send("Juego no encontrado");

    juego.reseña = "";
    juego.puntuacion = 0;
    await juego.save();

    res.json({ mensaje: "Reseña eliminada", juego });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
