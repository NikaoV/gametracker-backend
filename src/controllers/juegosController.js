const Juego = require("../models/juego.js");

// Obtener todos los juegos
const obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

// Agregar un nuevo juego
const agregarJuego = async (req, res) => {
  try {
    console.log(req.body)
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el juego" });
  }
};

// Actualizar un juego
const actualizarJuego = async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el juego" });
  }
};

// Eliminar un juego
const eliminarJuego = async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ message: "Juego eliminado" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el juego" });
  }
};

// Exportar funciones
module.exports = {
  obtenerJuegos,
  agregarJuego,
  actualizarJuego,
  eliminarJuego,
};