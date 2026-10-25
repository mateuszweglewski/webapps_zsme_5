// AUTOMATYCZNE SPRAWDZENIE — nie edytuj tego pliku.
// 1. W jednym terminalu: npm run dev
// 2. W drugim terminalu: node sprawdz.js

const URL = 'http://localhost:8080';
const KLUCZ = { 'Content-Type': 'application/json', 'x-api-key': 'lab123' };

const testy = [
  ['GET /api/czas zwraca 200 i pole czas', async () => {
    const r = await fetch(`${URL}/api/czas`);
    return r.status === 200 && 'czas' in (await r.json());
  }],
  ['GET /api/przedmioty zwraca listę', async () => {
    const r = await fetch(`${URL}/api/przedmioty`);
    const d = await r.json();
    return r.status === 200 && Array.isArray(d) && d.length >= 1;
  }],
  ['GET /api/przedmioty?min=4 filtruje', async () => {
    const wszystkie = await (await fetch(`${URL}/api/przedmioty`)).json();
    const d = await (await fetch(`${URL}/api/przedmioty?min=4`)).json();
    const oczekiwane = wszystkie.filter((p) => p.godziny >= 4).length;
    return Array.isArray(d) && d.length === oczekiwane && d.every((p) => p.godziny >= 4);
  }],
  ['GET /api/przedmioty/:id zwraca jeden przedmiot', async () => {
    const lista = await (await fetch(`${URL}/api/przedmioty`)).json();
    const pierwszy = lista[0];
    const r = await fetch(`${URL}/api/przedmioty/${pierwszy.id}`);
    return r.status === 200 && (await r.json()).nazwa === pierwszy.nazwa;
  }],
  ['GET /api/przedmioty/99 zwraca 404', async () => {
    return (await fetch(`${URL}/api/przedmioty/99`)).status === 404;
  }],
  ['POST bez klucza zwraca 401', async () => {
    const r = await fetch(`${URL}/api/przedmioty`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nazwa: 'Fizyka', godziny: 2 }),
    });
    return r.status === 401;
  }],
  ['POST z kluczem, bez godzin, zwraca 400', async () => {
    const r = await fetch(`${URL}/api/przedmioty`, {
      method: 'POST', headers: KLUCZ, body: JSON.stringify({ nazwa: 'Fizyka' }),
    });
    return r.status === 400;
  }],
  ['POST z kluczem i danymi zwraca 201 + id', async () => {
    const r = await fetch(`${URL}/api/przedmioty`, {
      method: 'POST', headers: KLUCZ, body: JSON.stringify({ nazwa: 'Fizyka', godziny: 2 }),
    });
    return r.status === 201 && typeof (await r.json()).id === 'number';
  }],
  ['Nieznany adres zwraca 404', async () => {
    return (await fetch(`${URL}/nie-ma-takiej-strony`)).status === 404;
  }],
  ['Strona główna to plik HTML z public/', async () => {
    const r = await fetch(URL);
    return r.status === 200 && (r.headers.get('content-type') || '').includes('text/html');
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
    const nowy = await (await fetch(`${URL}/api/przedmioty`, {
      method: 'POST', headers: KLUCZ, body: JSON.stringify({ nazwa: 'DoUsuniecia', godziny: 1 }),
    })).json();
    const bezKlucza = await fetch(`${URL}/api/przedmioty/${nowy.id}`, { method: 'DELETE' });
    const usun = await fetch(`${URL}/api/przedmioty/${nowy.id}`, { method: 'DELETE', headers: KLUCZ });
    const ponownie = await fetch(`${URL}/api/przedmioty/${nowy.id}`, { method: 'DELETE', headers: KLUCZ });
    encore = bezKlucza.status === 401 && usun.status === 204 && ponownie.status === 404;
  } catch {}
  console.log(`${encore ? '⭐' : '➖'} Encore (opcjonalnie, uruchom ponownie po zrobieniu): DELETE 401 / 204 / 404`);
  if (ok === testy.length) console.log('\nWszystko działa — pokaż wynik prowadzącemu.');
})();
