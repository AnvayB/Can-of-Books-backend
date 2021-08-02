'use strict'

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, enum: ['read','favorite','dislike']},
  img: { type: String, required: true}
})

const userSchema = new mongoose.Schema ({
  email: {type: String, required: true},
  books: [BookSchema]
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;