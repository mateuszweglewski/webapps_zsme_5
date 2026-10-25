// =============================================================
//  LABORATORIUM: pierwszy serwer Express — routing i middleware
//  Uzupełniaj luki ___ w kolejności podanej w instrukcji (Task 1.2–1.5).
//  Podpowiedzi masz w komentarzach. Nie zmieniaj reszty kodu.
// =============================================================

const express = require('___');                         // LUKA 1: jaką paczkę importujemy?
const logger = require('./middleware/logger');
const wymagajKlucza = require('./middleware/wymagajKlucza');

const app = express();
const PORT = 8080;   // Cloud Shell: Web Preview domyślnie otwiera port 8080

// ---------- MIDDLEWARE GLOBALNE (kolejność ma znaczenie!) ----------
app.use(___);                                            // LUKA 2: włącz nasz logger
app.use(express.___());                                  // LUKA 3: odczyt JSON z body → req.body
app.use(express.static('___'));                         // LUKA 4: folder z plikami statycznymi

// ---------- DANE (w pamięci — znikają po restarcie) ----------
let przedmioty = [
  { id: 1, nazwa: 'Matematyka', godziny: 4 },
  { id: 2, nazwa: 'Aplikacje webowe', godziny: 6 },
  { id: 3, nazwa: 'Język angielski', godziny: 3 },
];
let nastepneId = 4;

// ---------- TRASY ----------

// GET /api/czas → { czas: "..." }
app.___('/api/czas', (req, res) => {                     // LUKA 5: jaka metoda HTTP?
  res.___({ czas: new Date().toISOString() });           // LUKA 6: odeślij obiekt jako JSON
});

// GET /api/przedmioty?min=4 → przedmioty z co najmniej 4 godzinami
app.get('/api/przedmioty', (req, res) => {
  const min = Number(req.___.min);                       // LUKA 7: skąd bierzemy ?min=...
  res.json(min ? przedmioty.filter((p) => p.godziny >= min) : przedmioty);
});

// GET /api/przedmioty/2 → jeden przedmiot albo 404
app.get('/api/przedmioty/___', (req, res) => {          // LUKA 8: parametr w ścieżce o nazwie id
  const p = przedmioty.find((x) => x.id === Number(req.___.id));  // LUKA 9: skąd bierzemy :id
  if (!p) return res.status(___).json({ blad: 'Nie ma takiego przedmiotu' });  // LUKA 10: kod "nie znaleziono"
  res.json(p);
});

// POST /api/przedmioty → dodanie przedmiotu, tylko z kluczem API
app.post('/api/przedmioty', /* LUKA 11 */ (req, res) => {  // LUKA 11: wstaw tu middleware sprawdzający klucz (z przecinkiem)
  const { nazwa, godziny } = req.body ?? {};
  if (!nazwa || !godziny) {
    return res.status(___).json({ blad: 'Wymagane pola: nazwa, godziny' });  // LUKA 12: kod "złe dane"
  }
  const nowy = { id: nastepneId++, nazwa, godziny: Number(godziny) };
  przedmioty.push(nowy);
  res.status(___).json(nowy);                            // LUKA 13: kod "utworzono"
});

// ---------- 404 — dla wszystkiego, czego nikt wyżej nie obsłużył ----------
app.use((req, res) => {
  res.status(404).json({ blad: `Brak trasy ${req.method} ${req.originalUrl}` });
});

app.listen(___, () => console.log(`Serwer: http://localhost:${PORT}`));  // LUKA 14: na jakim porcie?
