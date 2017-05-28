var mongoose = require('mongoose');

// Configure mongoose to use native promises
mongoose.Promise = global.Promise;

// Connecting to database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
mongoose
};
