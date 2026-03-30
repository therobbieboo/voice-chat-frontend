const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CSP header to allow data: audio
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; media-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://voice-chat-backend-production.up.railway.app wss://voice-chat-backend-production.up.railway.app;");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Health check
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Voice Chat Frontend running on port ${PORT}`);
});
