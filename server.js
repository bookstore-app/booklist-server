'use strict';

const cors =require('cors');
const pg = require('pg');
const express = require('express');
const app = express();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.errer(err));

app.use(cors());

app.get('/', (req, res) => res.redirect(CLIENT_URL));
app.get ('*', (req, res) => res.sendStatus('you didnt get there'));

app.get('/books', (req, res) => {
  client.query('SELECT * from books;')
  .then(results => res.send(results.row))
  .catch(console.error);
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));