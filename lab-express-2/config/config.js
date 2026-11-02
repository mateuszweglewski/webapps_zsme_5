// Konfiguracja z pliku .env (jak na wykładzie L5)
if (!process.env.API_KEY) {
  console.error('Brak API_KEY. Zrób: cp .env.example .env');
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 8080,
  apiKey: process.env.API_KEY,
};
