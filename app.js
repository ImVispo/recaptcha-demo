require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const request = require('request-promise');

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const app = express();

app.use(morgan('tiny'));
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.post('/api/verify', slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500,
}), rateLimit({
  windowMs: 30 * 1000,
  max: 3,
}), (req, res, next) => {
  const { token } = req.body
  try {
    request({
      method: 'POST',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHAV3_SECRET}&response=${token}&remoteip=${req.ip}`,
      gzip: true,
      json: true,
      resolveWithFullResponse: true
    }).then((result) => {
      res.json(result.body);
    })
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'NOT_IN_DEVELOPMENT' : error.stack
  })
})

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});