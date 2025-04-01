const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true,
    trim: true
},
//   genre: {
//     type: String
//   },
//   publishedYear: {
//     type: Number
//   },
//   rating: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 5
// }
});

const Book = mongoose.model('Book', bookSchema, 'books');
module.exports = Book;