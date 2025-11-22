const mongoose = require("mongoose");

// Esquema del juego
const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String },
  plataforma: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, min: 0, max: 5 },
  reseña: { type: String },
  customID: {type: Number, unique: true, required: true},
  imagen: { type: String, required: true },
});

// Modelo
const juego = mongoose.model("juego", juegoSchema);

module.exports = juego;
