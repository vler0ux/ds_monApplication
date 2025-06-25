const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000;
const coords = [];


app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
  const { login, mot_de_passe } = req.body;

  // Ici tu enregistres dans ta base locale ou en mémoire
  console.log('Nouvel utilisateur :', login, mot_de_passe);

  res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
});

app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Coordonnées reçues : Latitude=${latitude}, Longitude=${longitude}`);
  coords.push({ latitude, longitude });
  res.json({ message: 'Coordonnées bien reçues' });
});

app.get('/api/coords', (req, res) => {
  res.json(coords);
});

app.post('/api/register', (req, res) => {
  res.send('Utilisateur enregistré');
});

app.listen(PORT, () => {
  console.log(`Serveur Express en écoute sur http://localhost:${PORT}`);
});
