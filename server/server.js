// Library imports
var express = require('express');
var bodyParser = require('body-parser');

// Local imports
var {mongoose} = require('./db/mongoose'); // ES6 Destructuring
var {User} = require('./models/users'); // ES6 Destructuring
var {Todo} = require('./models/todos'); // ES6 Destructuring

// host port
const port = process.env.PORT || 3000

var app = express();

// Parse incoming request bodies in a middleware (req body converted from json to an object)
app.use(bodyParser.json());

// POST method to create todos
app.post('/todos', (req, res) => {

var newTodo = new Todo(
  {
    //Get the todo text from request body
    text: req.body.text
  }
);

newTodo.save()
.then((doc) => {
  // Send back the doc
  res.send(doc);

}).catch((err) => {
  // Send a 400 bad request error
  res.status(400).send(err);

});


});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
