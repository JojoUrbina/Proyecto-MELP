import express from 'express';
import fetch from 'node-fetch'; // Necesitas instalarlo con npm install node-fetch
import cors from 'cors'

const app = express();
const puerto = 3000; // Puedes cambiar el puerto si es necesario
app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const respuesta = await fetch('https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json');
    const datos = await respuesta.json();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ mensaje: 'Error al obtener datos' });
  }
});

app.listen(puerto, () => {
  console.log(`Servidor proxy en ejecución en el puerto ${puerto}`);
});
