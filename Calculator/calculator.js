const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("The resultof the calculation is - "+ result);
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});


app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
    var n1 = parseFloat(req.body.weight);
    var n2 = parseFloat(req.body.height);

    var bmi = n1 / (n2*n2);
    res.send("Your BMI is -"+ bmi);
});