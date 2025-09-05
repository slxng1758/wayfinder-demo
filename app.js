/**
 * Backend server for wayfinder-demo
 */

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');

const app = express();

// Port
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Middleware
try {
  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
} catch (err) {
  console.warn('⚠️ No favicon found at public/images/favicon.png (optional)');
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse JSON request bodies
app.use(methodOverride('_method'));

// Serve static React build
const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

// Example API route (add your backend endpoints here)
app.post('/api/log-language', (req, res) => {
  const { language } = req.body;
  console.log('🌐 Logged language:', language);
  res.sendStatus(200);
});

// Development settings
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// ✅ Catch-all route for React Router (works with Express v5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send(err);
    }
  });
});

// Create HTTP server
http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
