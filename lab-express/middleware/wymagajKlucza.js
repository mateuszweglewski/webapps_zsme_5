// Middleware na poziomie trasy: przepuszcza dalej tylko z poprawnym kluczem.
// Klient musi wysłać nagłówek:  x-api-key: lab123

module.exports = function wymagajKlucza(req, res, next) {
  if (req.get('___') !== 'lab123') {                     // LUKA 17: nazwa nagłówka
    return res.status(___).json({ blad: 'Brak lub zły klucz API' });  // LUKA 18: kod "nieuwierzytelniony"
  }
  next();
};
