require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const fileUpload = require('express-fileupload');
const router = require('./router.js');
const rateLimit = require('express-rate-limit');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(fileUpload());
app.use(router);

const generalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again after 1 hour.",
});

app.use(generalLimiter);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, Page not found');
});

const server = app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Sorry, something went wrong! ${err}`);
  } else {
    console.log(`Server is listening on port ${SERVER_PORT}!`);
  }
});

module.exports = server;