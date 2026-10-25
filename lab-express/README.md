# LAB 3 — Express: routing & middleware

Komendy do szybkiego kopiowania. 

## Task 3.3

```bash
npm init -y
ls
npm install express
ls
echo "node_modules/" > .gitignore
npm pkg set scripts.dev="node --watch app.js"
cat package.json
```

## Task 3.4

```bash
npm run dev
```

W drugiej karcie terminala:

```bash
cd ~/lab-express
curl localhost:8080/api/czas
```

## Task 3.5

```bash
curl "localhost:8080/api/przedmioty?min=4"
curl -i localhost:8080/api/przedmioty/99
```

## Task 3.6

Bez klucza:

```bash
curl -i -X POST localhost:8080/api/przedmioty -H "Content-Type: application/json" -d '{"nazwa":"Fizyka","godziny":2}'
```

Z kluczem:

```bash
curl -i -X POST localhost:8080/api/przedmioty -H "Content-Type: application/json" -H "x-api-key: lab123" -d '{"nazwa":"Fizyka","godziny":2}'
```

## Task 3.7

```bash
node sprawdz.js
```

## Gdy coś nie działa

| Objaw | Rozwiązanie |
|---|---|
| `Cannot find module 'express'` | `cd ~/lab-express`, potem `npm install express` |
| `___ is not defined` / `Cannot find module '___'` | Została luka — Ctrl+F `___` |
| `EADDRINUSE :8080` | Serwer działa w innej karcie — Ctrl+C tam |
| `Serwer nie działa` w sprawdz.js | Najpierw `npm run dev` w pierwszej karcie |
| curl czeka bez końca | Brakuje `next()` w middleware (Ctrl+C przerywa) |
