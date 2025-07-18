// backend/server.js
const app = require('./app');

// Define port (from .env or fallback to 5001)
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
