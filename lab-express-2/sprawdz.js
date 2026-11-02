// AUTOMATYCZNE SPRAWDZENIE — nie edytuj tego pliku.
// 1. W pierwszej karcie: npm run dev
// 2. W drugiej karcie:   node sprawdz.js

const URL = 'http://localhost:8080/api/przedmioty';
const JSON_H = { 'Content-Type': 'application/json' };
const KLUCZ = { ...JSON_H, 'x-api-key': 'lab456' };

const post = (headers, body) => fetch(URL, { method: 'POST', headers, body: JSON.stringify(body) });
const tresc = async (r) => { try { return await r.json(); } catch { return null; } };
let nowy = null; // przedmiot utworzony w teście 7, używany dalej

const testy = [
  ['GET /api/przedmioty → 200 i tablica', async () => {
    const r = await fetch(URL);
    const d = await tresc(r);
    return r.status === 200 && Array.isArray(d) && d.length >= 1;
  }],
  ['GET /api/przedmioty/:id → 200 i ten przedmiot', async () => {
    const pierwszy = (await tresc(await fetch(URL)))[0];
    const r = await fetch(`${URL}/${pierwszy.id}`);
    return r.status === 200 && (await tresc(r))?.nazwa === pierwszy.nazwa;
  }],
  ['GET /api/przedmioty/999 → 404 i pole blad', async () => {
    const r = await fetch(`${URL}/999`);
    const blad = (await tresc(r))?.blad;
    // "Brak trasy…" to 404 z app.js, a nie z Twojej trasy
    return r.status === 404 && typeof blad === 'string' && !blad.startsWith('Brak trasy');
  }],
  ['POST bez klucza → 401', async () => {
    return (await post(JSON_H, { nazwa: 'Fizyka', godziny: 2 })).status === 401;
  }],
  ['POST bez godzin → 400 i pole blad', async () => {
    const r = await post(KLUCZ, { nazwa: 'Fizyka' });
    return r.status === 400 && typeof (await tresc(r))?.blad === 'string';
  }],
  ['POST bez nazwy → 400', async () => {
    return (await post(KLUCZ, { godziny: 2 })).status === 400;
  }],
  ['POST poprawny → 201 i przedmiot z id', async () => {
    const r = await post(KLUCZ, { nazwa: 'Sprawdzian', godziny: 2 });
    const d = await tresc(r);
    if (r.status === 201 && typeof d?.id === 'number' && d.nazwa === 'Sprawdzian') nowy = d;
    return nowy !== null;
  }],
  ['Nowy przedmiot da się pobrać przez GET /:id', async () => {
    if (!nowy) return false;
    return (await fetch(`${URL}/${nowy.id}`)).status === 200;
  }],
  ['DELETE bez klucza → 401', async () => {
    if (!nowy) return false;
    return (await fetch(`${URL}/${nowy.id}`, { method: 'DELETE' })).status === 401;
  }],
  ['DELETE → 204, drugi raz → 404', async () => {
    if (!nowy) return false;
    const r1 = await fetch(`${URL}/${nowy.id}`, { method: 'DELETE', headers: KLUCZ });
    const r2 = await fetch(`${URL}/${nowy.id}`, { method: 'DELETE', headers: KLUCZ });
    return r1.status === 204 && r2.status === 404;
  }],
];

(async () => {
  let ok = 0;
  for (const [opis, test] of testy) {
    let wynik = false;
    try { wynik = await test(); } catch (e) {
      if (e.cause?.code === 'ECONNREFUSED') {
        console.log('\n❌ Serwer nie działa. Uruchom najpierw: npm run dev\n');
        process.exit(1);
      }
    }
    console.log(`${wynik ? '✅' : '❌'} ${opis}`);
    if (wynik) ok++;
  }
  console.log(`\nWynik: ${ok}/${testy.length}`);

  // ★ THE ENCORE — nie wlicza się do wyniku /10
  let encore = false;
  try {
    const p = await tresc(await post(KLUCZ, { nazwa: 'DoZmiany', godziny: 1 }));
    const patch = (h, id, body) =>
      fetch(`${URL}/${id}`, { method: 'PATCH', headers: h, body: JSON.stringify(body) });
    const bezKlucza = await patch(JSON_H, p.id, { godziny: 5 });
    const r = await patch(KLUCZ, p.id, { godziny: 5 });
    const d = await tresc(r);
    const brak = await patch(KLUCZ, 999, { godziny: 5 });
    encore = bezKlucza.status === 401 && r.status === 200 && d?.godziny === 5
      && d?.nazwa === 'DoZmiany' && brak.status === 404;
    await fetch(`${URL}/${p.id}`, { method: 'DELETE', headers: KLUCZ });
  } catch {}
  console.log(`${encore ? '⭐' : '➖'} Encore (opcjonalnie): PATCH 401 / 200 / 404`);
  if (ok === testy.length) console.log('\nWszystko działa — pokaż wynik prowadzącemu.');
})();
