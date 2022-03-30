const express = require("express");

const app = express();

app.get("/", function(req, res){
    res.send("<h1>hello</h1>");
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});

app.get("/about",function(req, res){
    res.send("hhtd tthtyr rtyr");
})

app.get("/hobbies",function(req, res){
    res.send("<ul><li>drawing</li><li>cooking</li><li>games</li></ul>");
})