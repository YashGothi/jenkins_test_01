const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the Jenkins CI/CD demo app!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

function add(a, b) {
  return a + b;
}

// Only start the server if this file is run directly (not when imported for tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = { app, add };
