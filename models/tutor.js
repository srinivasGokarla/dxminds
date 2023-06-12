const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;