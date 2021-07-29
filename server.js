'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const mongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect('mongodb://localhost:27017/cats-database', mongooseOptions);
const User = require('./User.js');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const client = jwksClient({
  jwksUri: 'https://anvayb.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/auth-test', (request, response) => {
  const token = request.headers.authorization.split('')[1];
  jwt.verify(token, getKey, {}, function(error) {
    if (error) {
      response.send('Token Invalid. This route is inaccessible');
    } else {
      response.json({'token': token});
    }
  }
)});

// seeding into the database
const trial = new User({
  email: 'blank@trial.com',
  books: [{
    name: 'Book Title',
    description: 'Book Summary',
    status: 'How much of book has been read?'
  }]
})
console.log(trial);
trial.save();

app.get('/books', getUserBooks);

function getUserBooks (request, response) {
  User.find({}).then(userBooks => {
    console.log(userBooks);
    response.json(userBooks);
  })
};

app.post('/books', (request, response) => {
  console.log('hello')
  let newUserBook = new User(request.body);
  newUserBook.save().then(book => {
      response.json(book);
    })
  }
)

app.delete('/books/:id', (request, response) => {
  let id = request.params.id;
  User.findByIdAndDelete(id).then(() => 
  response.json({ msg: 'Book Removed' })).catch(error => 
    console.error(error));
});

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end



app.listen(PORT, () => console.log(`listening on ${PORT}`));
