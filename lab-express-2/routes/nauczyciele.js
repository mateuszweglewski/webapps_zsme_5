// PRZYKŁAD — gotowy router. Podglądaj go, pisząc routes/przedmioty.js.
// Dane są tu na sztywno, żeby przykład był krótki (w przedmiotach używasz modelu).
const express = require('express');
const router = express.Router();

const nauczyciele = [
  { id: 1, imie: 'Anna', przedmiot: 'Matematyka' },
  { id: 2, imie: 'Piotr', przedmiot: 'Aplikacje webowe' },
];

// GET /api/nauczyciele  →  200 + lista
router.get('/', (req, res) => {
  res.json(nauczyciele);
});

// GET /api/nauczyciele/:id  →  200 + jeden nauczyciel albo 404
router.get('/:id', (req, res) => {
  const n = nauczyciele.find((x) => x.id === Number(req.params.id));
  if (!n) {
    return res.status(404).json({ blad: 'Nie ma takiego nauczyciela' });
  }
  res.json(n);
});

module.exports = router;
