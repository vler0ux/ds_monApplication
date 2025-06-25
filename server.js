const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json()); 


app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Coordonnées reçues : Latitude=${latitude}, Longitude=${longitude}`);
  res.json({ message: 'Coordonnées bien reçues' });
});

app.get('/', (req, res) => {
  res.send('🚀 API Localisation opérationnelle !');
});


app.listen(PORT, () => {
  console.log(`Serveur Express en écoute sur http://localhost:${PORT}`);
});
