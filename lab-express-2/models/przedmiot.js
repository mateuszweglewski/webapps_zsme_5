// MODEL — gotowy, NIE zmieniaj. Używasz go w routes/przedmioty.js.
//
//   Przedmiot.wszystkie()                 → tablica wszystkich przedmiotów
//   Przedmiot.znajdz(id)                  → przedmiot albo undefined
//   Przedmiot.dodaj({ nazwa, godziny })   → nowy przedmiot (z id)
//   Przedmiot.usun(id)                    → true (usunięto) albo false (nie było)
//   Przedmiot.zmien(id, { ...pola })      → zmieniony przedmiot albo undefined (THE ENCORE)
//
// UWAGA: id to liczba. req.params.id to tekst — zamień: Number(req.params.id)

let przedmioty = [
  { id: 1, nazwa: 'Matematyka', godziny: 4 },
  { id: 2, nazwa: 'Aplikacje webowe', godziny: 6 },
  { id: 3, nazwa: 'Język angielski', godziny: 3 },
];
let nastepneId = 4;

exports.wszystkie = () => przedmioty;

exports.znajdz = (id) => przedmioty.find((p) => p.id === id);

exports.dodaj = ({ nazwa, godziny }) => {
  const nowy = { id: nastepneId++, nazwa, godziny: Number(godziny) };
  przedmioty.push(nowy);
  return nowy;
};

exports.usun = (id) => {
  const przed = przedmioty.length;
  przedmioty = przedmioty.filter((p) => p.id !== id);
  return przedmioty.length < przed;
};

exports.zmien = (id, pola) => {
  const p = exports.znajdz(id);
  if (!p) return undefined;
  if (pola.nazwa !== undefined) p.nazwa = pola.nazwa;
  if (pola.godziny !== undefined) p.godziny = Number(pola.godziny);
  return p;
};
