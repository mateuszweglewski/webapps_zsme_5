// Middleware = funkcja (req, res, next).
// Logger wypisuje w terminalu: metoda, adres, kod statusu, czas w ms.

module.exports = function logger(req, res, next) {
  const start = Date.now();

  // Zdarzenie emitowane, gdy odpowiedź została już wysłana do klienta
  res.on('___', () => {                                  // LUKA 15: nazwa zdarzenia (ang. "zakończ")
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start} ms)`);
  });

  ___();                                                 // LUKA 16: przekaż żądanie dalej w łańcuchu
};
