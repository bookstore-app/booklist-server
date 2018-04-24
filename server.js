'use strict';

const cors = require('cors');
const pg = require('pg');
const express = require('express');
const app = express();

const PORT = proccess.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.CLIENT(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/', (req, res) => res.send('no where'));

app.get('/books', (req, res) => {
  client.query('SELECT * from tasks;')
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));