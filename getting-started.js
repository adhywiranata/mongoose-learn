// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db connected!');
  /*
  ===============
  Mongoose Schema
  ===============
  Everything in Mongoose starts with a Schema.
  Each schema maps to a MongoDB collection and defines
  the shape of the documents within that collection.

  The permitted SchemaTypes are: String, Number, Date,
  Buffer, Boolean, Mixed, ObjectId, Array.
  */
  var Schema = mongoose.Schema;

  // set up the Schema and its attributes
  var kittySchema = new Schema({
    name: String,
  });

  // Adding a method to the schema
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }

  // Compile the Schema into a Model
  /*
  ==============
  Mongoose Model
  ==============
  Models are fancy constructors compiled from our Schema definitions.

  Instances of Models are documents.
  Documents have many of their own built-in instance methods.
  We may also define our own custom document instance methods too.
  */
  var Kitten = mongoose.model('Kitten', kittySchema);

  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  silence.speak(); // 'Meow name is Silence'

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });

  /*
    This performs a search for all documents with a name
    property that begins with "Fluff" and returns the result
    as an array of kittens to the callback.
  */
  Kitten.find({ name: /^fluff/ }, function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });

});
