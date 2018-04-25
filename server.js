'use strict';

const cors = require('cors');
const fs = require('fs');
const cors = require('cors');
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

app.get('*', (req, res) => res.sendStatus('you didnt get there'));


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

function loadBooks() {
fstat.readFile('../booklist-client/data/books.json', 'utf8', (err, fd) => {
  JSON.parse(fd).forEach(ele => {
    client.query(
      'INSERT INTO books (author, title, isbn, image_url, description) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING', [ele.author, ele.title, ele.isbn, ele.image_url, ele.description]
    )
  })
})
}

app.get('/new')



function loadDB() {
  client.query(`
  CREATE TABLE IF NOT EXISTS
  books (
    book_id SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
  );`
  )
    .then(data => {
      loadBooks(data);
    })
    .catch(err => {
      console.error(err);
    });
}

loadDB();