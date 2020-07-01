require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const request = require('request-promise');

const app = express();

app.use(morgan('tiny'));
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.post('/api/verify', (req, res) => {
  const { token } = req.body
  request({
    method: 'POST',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHAV3_SECRET}&response=${token}`,
    gzip: true,
    json: true,
    resolveWithFullResponse: true
  }).then((result) => {
    res.json(result.body);
  })
})

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});