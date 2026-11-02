// APLIKACJA — gotowa. Twoja praca jest w routes/przedmioty.js
const express = require('express');
const config = require('./config/config');
const logger = require('./middleware/logger');

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.static('public'));

// Routery: prefiks + plik z trasami
app.use('/api/nauczyciele', require('./routes/nauczyciele'));
app.use('/api/przedmioty', require('./routes/przedmioty'));

// 404 — nikt wyżej nie odpowiedział
app.use((req, res) => {
  res.status(404).json({ blad: `Brak trasy ${req.method} ${req.originalUrl}` });
});

// Błąd w kodzie — 500 zamiast wywalenia serwera
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ blad: err.status ? err.message : 'Błąd serwera' });
});

app.listen(config.port, () => console.log(`Serwer: http://localhost:${config.port}`));
