const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;