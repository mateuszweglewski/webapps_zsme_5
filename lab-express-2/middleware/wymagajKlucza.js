// Gotowe. Wstaw na trasie między ścieżkę a funkcję:
//   router.post('/', wymagajKlucza, (req, res) => { ... })
const config = require('../config/config');

module.exports = function wymagajKlucza(req, res, next) {
  if (req.get('x-api-key') !== config.apiKey) {
    return res.status(401).json({ blad: 'Brak lub zły klucz API' });
  }
  next();
};
