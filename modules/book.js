'use strict';

const getKey = require('../lib/getKey.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const Book = {};

// http://localhost:3001/books?id=12345

// http://localhost:3001/books/12345
Book.list = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, async function(err, user) {
    if (err) {
      res.send('invalid user')
    } else {
      const email = req.query.email;

      await User.find({ email }, (err, user) => {
        if (err) {
          res.send('invalid user')
        } else {
          res.send(user.books);
        }
      })
    }
  })
}

Book.add = (req, res) => {
  // this token comes from the frontend
  // req.headers.authorization = 'Bearer 90j0erj09ejr09fjer09fj';
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, async function(err, user) {
    if (err) {
      res.send('invalid user')
    } else {
      const { email, name, description, status, img } = req.body;
      const newBook = { name, description, status, img };

      await User.findOne({ email }, (err, user) => {
        user.books.push(newBook);
        user.save().then(() => {
          res.send(user.books)
        })
        .catch(err => console.error(err))
      })
    }
  })
}

Book.delete = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, async function(err, user) {
    if (err) {
      res.send('invalid user')
    } else {
      const id = req.params.id;
      const email = req.params.id;
      await User.findOne({ email }, (err, user) => {
        const filtered = user.books.filter(book => book.id !== id);
        user.books = filtered;
        user.save();
        res.send(filtered);
      })
    }
  })
}

Book.update = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, async function(err, user) {
    if (err) {
      res.send('invalid user')
    } else {
      const { email, name, description, status, img } = req.body;
      const id = Number(req.params.id);

      await User.findOne({ email }, (err, user) => {
        const bookArr = user.books.map((book, i) => {
          return book._id === id ? book = { name, description, status, img } : book;
        });

        user.books = bookArr;
        user.save();
        res.send(bookArr);
      });
    }
  })
}

module.exports = Book;
