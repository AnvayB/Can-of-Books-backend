'use strict'

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
})

module.exports = mongoose.model('books', BookSchema);