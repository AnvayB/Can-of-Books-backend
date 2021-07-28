'use strict'

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
})

const UserSchema = new mongoose.Schema ({
  email: {type: String, required: true},
  books: [BookSchema]
})

module.exports = mongoose.model('users', UserSchema);