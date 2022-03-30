const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/personDB',{useNewUrlParser: true});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person",personSchema);

const person = new Person({
    name: "Arthur",
    age: 32
})

person.save();