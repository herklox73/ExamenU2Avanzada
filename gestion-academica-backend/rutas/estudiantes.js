const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: String,
  apellido: String,
  nivel: String
});

const Estudiante = mongoose.model('Estudiante', EstudianteSchema);

// GET /api/estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// GET /api/estudiantes/:cedula
router.get('/:cedula', async (req, res) => {
  try {
    const estudiante = await Estudiante.findOne({ cedula: req.params.cedula });
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar estudiante' });
  }
});

// PUT /api/estudiantes/:cedula
router.put('/:cedula', async (req, res) => {
  try {
    const { nombre, apellido, nivel } = req.body;
    const estudiante = await Estudiante.findOneAndUpdate(
      { cedula: req.params.cedula },
      { nombre, apellido, nivel },
      { new: true }
    );
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
});

module.exports = router; 