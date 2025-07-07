const express = require('express');
const cors = require('cors');
const conectarDB = require('./conexion');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/api/estudiantes', require('./rutas/estudiantes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 