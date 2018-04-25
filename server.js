'use strict';

const cors =require('cors');
const pg = require('pg');
const express = require('express');
const app = express();
//test
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/', (req, res) => res.redirect(CLIENT_URL));
app.get('/test', (req, res) => res.send('test success'));

app.get('/api/v1/books', (req, res) => {
  client.query('SELECT * from books;')
    .then(results => res.send(results.rows))
    .catch(console.error);
});
app.get ('*', (req, res) => res.sendStatus('you didnt get there'));


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


// function loadBooks() => {
//   client.query(`
//   CREATE DATABASE IF NOT EXISTS
//   book_app`)
// }