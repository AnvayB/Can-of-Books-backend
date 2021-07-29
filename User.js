'use strict'

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String}
})

const UserSchema = new mongoose.Schema ({
  email: {type: String},
  books: [BookSchema]
})

module.exports = mongoose.model('users', UserSchema);