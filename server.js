'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./modules/book.js');
const app = express();
const PORT = process.env.PORT || 3002;
const mongooseOptions = { useNewParser: true, useUnifiedTopology: true };

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)

app.get('/books', Book.list); 
app.post('/books', Book.add);
app.put('/books/:id', Book.update) 
app.delete('/books/:id', Book.delete) 

app.use('*', (req, res) => {
  res.status(404).send('route not found');
});

app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
})