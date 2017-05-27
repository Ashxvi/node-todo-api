const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //Mongo automatically creates our new database

  if (err) {
    return console.log('Could not connect to Mongo Database : ', err); // The return stops the arrow function
  }

  console.log('Connected to Mongo Database.');

  //  CREATING TODOS COLLECTION
  var todos = db.collection('todos');

  // WIPE OUT EXISTING DOCUMENTS
  todos.remove();

  // INSERT ONE DOCUMENT
  todos.insertOne({
    text: 'Wash my clothes',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Could not insert Todo :', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2)); // Ops contains the documents inserted with added _id fields
  });

  // INSERTING MANY DOCUMENTS
  try {
    todos.insertMany([{
        text: "Buy a shirt",
        completed: true
      },
      {
        text: "Pay phone bill",
        completed: true
      },
      {
        text: "Walk the dog",
        completed: true
      }
    ]);
  } catch (e) {
    print(e);
  }

  //  CREATING USERS COLLECTION
  var users = db.collection('users');

  // WIPE OUT EXISTING DOCUMENTS
  users.remove();

  // INSERT ONE DOCUMENT
  users.insertOne({
    name: 'Achraf',
    age: 23,
    location: 'Paris'

  }, (err, result) => {
    if (err) {
      return console.log('Could not insert User :', err);
    }

    console.log('Printing the result.ops : ', JSON.stringify(result.ops, undefined, 2)); // Ops contains the documents inserted with added _id fields

    console.log('The first users document was created at :', result.ops[0]._id.getTimestamp()); // Ops contains the documents inserted with added _id fields

  });

  // INSERTING MANY DOCUMENTS
  try {
    users.insertMany([{
        name: "Sanae",
        age: 19,
        location: "Meknes"
      },
      {
        name: "John",
        age: 31,
        location: "Ottawa"
      },
      {
        name: "Timothy",
        age: 18,
        location: "Berlin"
      }
    ]);
  } catch (e) {
    print(e);
  }

  // USING CURSORS WHICH HANDLES ALL THE OPERATIONS ON QUERY RESULT USING FIND FROM TODOS

  // Grab a cursor
  var todosCursor = todos.find();
    // find({completed: true}) to fetch completed todos only
    // or find({_id: new ObjectID('59282941bc58f57a766d0921')}) to get a specific todo

    todosCursor.toArray()
    .then((documents) => { // returns a promise
        console.log('Todos :', JSON.stringify(documents, undefined, 2));
      },
      (err) => {
        console.log('Could not fetch documents : ', err);
      }
    );

  // USING CURSORS WHICH HANDLES ALL THE OPERATIONS ON QUERY RESULT USING FIND FROM USERS

  // Grab a cursor
  var usersCursor = users.find();
  // Only users with age > 20     var usersCursor = users.find({age : { $gt: 20 }});
  // Asc Sort by name             var usersCursor = users.find().sort({'name':1});
  // Skip users with age > 20     var usersCursor = users.find().skip({age : { $gt: 20 }});

  usersCursor.toArray()
    .then((documents) => { // returns a promise
        console.log('Users :', JSON.stringify(documents, undefined, 2));
      },
      (err) => {
        console.log('Could not fetch documents : ', err);
      }
    );
    // More cursor methods at http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html



  // This function iterates over a query to modify the location of people with age < 20





  db.close();
});
