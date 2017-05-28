var mongoose = require('mongoose');


var User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true
  },
  age: {
    type: Number,
    required: true,
  }
});


module.exports = {
User
};
