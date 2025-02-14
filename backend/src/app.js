const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/INDEX.JS');
const path = require('path');

dotenv.config({ path: './backend/src/.env' });
console.log('Valor de MONGO_URI:', process.env.MONGO_URI);
connectDB();
 
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});