// =============================================================
//  LAB 4 — TWÓJ ROUTER. Ten plik piszesz sam.
//  Wzór: routes/nauczyciele.js  ·  Dane: models/przedmiot.js
//  Router jest podpięty w app.js pod /api/przedmioty,
//  więc tutaj ścieżki są krótkie: '/' oraz '/:id'.
// =============================================================
const express = require('express');
const Przedmiot = require('../models/przedmiot');
const wymagajKlucza = require('../middleware/wymagajKlucza');

const router = express.Router();

// Task 4.3 — GET /  →  200 + lista wszystkich przedmiotów


// Task 4.3 — GET /:id  →  200 + przedmiot,  404 + { blad: '...' } gdy go nie ma


// Task 4.4 — POST /  (z kluczem)
//   brak nazwa albo godziny  →  400 + { blad: '...' }
//   OK                        →  201 + nowy przedmiot


// Task 4.5 — DELETE /:id  (z kluczem)
//   usunięto  →  204 (bez treści)
//   nie było  →  404 + { blad: '...' }


module.exports = router;
