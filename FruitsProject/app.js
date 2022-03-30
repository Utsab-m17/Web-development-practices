const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,"Why no name specified?"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 6,
  review: "Good fruit"
});

//  fruit.save();




// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("succesfully saved all the fruits to fruitsDB");
//   }
// })



Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    })
  }
})



// Fruit.updateOne({_id: "61d46b9461e31cb2419dc7cb"},{name: "Peach"}, function(err){
//   if(err){
//         console.log(err);
//       }else{
//         console.log("succesfully saved all the fruits to fruitsDB");
//       }
// })


Fruit.deleteOne({_id:"61d45976f0d6fada8075f440"},function(err){
  if(err){
            console.log(err);
          }else{
            console.log("succesfully deleted selected fruits from fruitsDB");
          }
})