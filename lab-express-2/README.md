# LAB 4 — Express: własne trasy i kody HTTP

Instrukcję masz na kartce. Tutaj są komendy do skopiowania.

## Task 4.2

```bash
npm install
cp .env.example .env
cat .env
npm run dev
```

W drugiej karcie terminala:

```bash
cd ~/webapps_zsme_5/lab-express-2
curl localhost:8080/api/nauczyciele
curl -i localhost:8080/api/nauczyciele/9
```

## Task 4.3

```bash
curl localhost:8080/api/przedmioty
curl localhost:8080/api/przedmioty/2
curl -i localhost:8080/api/przedmioty/99
```

## Task 4.4

```bash
curl -i -X POST localhost:8080/api/przedmioty -H "Content-Type: application/json" -H "x-api-key: lab456" -d '{"nazwa":"Fizyka"}'
curl -i -X POST localhost:8080/api/przedmioty -H "Content-Type: application/json" -H "x-api-key: lab456" -d '{"nazwa":"Fizyka","godziny":2}'
```

## Task 4.5

Najpierw dodaj Fizykę jeszcze raz (po zapisaniu pliku serwer się zrestartował):

```bash
curl -i -X POST localhost:8080/api/przedmioty -H "Content-Type: application/json" -H "x-api-key: lab456" -d '{"nazwa":"Fizyka","godziny":2}'
curl -i -X DELETE localhost:8080/api/przedmioty/4 -H "x-api-key: lab456"
curl -i -X DELETE localhost:8080/api/przedmioty/4 -H "x-api-key: lab456"
```

## Task 4.6

```bash
node sprawdz.js
```

## Gdy coś nie działa

| Objaw | Rozwiązanie |
|---|---|
| `node: bad option: --env-file` | Za stary Node: `nvm install --lts`, potem `npm run dev` |
| `Brak API_KEY` | Nie ma pliku .env: `cp .env.example .env` |
| `EADDRINUSE :8080` | Serwer działa w innej karcie: Ctrl+C tam |
| `Brak trasy GET /api/przedmioty` | Trasa nie istnieje albo plik niezapisany. Ścieżka w routerze to `'/'`, nie `'/api/przedmioty'` |
| `Cannot GET` / `ReferenceError` w terminalu | Literówka w nazwie (`Przedmiot`, `router`, `req`, `res`) |
| `req.body` jest `undefined` | Brak `-H "Content-Type: application/json"` w curl |
| GET `/2` zwraca 404 | Porównujesz liczbę z tekstem: użyj `Number(req.params.id)` |
| curl wisi | Trasa nic nie odsyła: każda ścieżka kodu musi kończyć się `res.…` |
| 400 i 201 naraz (`Cannot set headers`) | Brakuje `return` przed `res.status(400)` |
