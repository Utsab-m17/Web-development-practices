const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);





////////////////////////////////////////////////////////Request Targetting All Articles///////////////////////////////////////////////////

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles.");
            } else {
                res.send(err);
            }
        });
    });





////////////////////////////////////////////////////////Request Targetting A Specific Article///////////////////////////////////////////////////

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles found");
            }
        });
    })

    .patch(function (req, res) {
        const articleTitle = req.params.articleTitle;
        Article.updateOne(
            { title: articleTitle },
            { content: req.body.newContent },
            function (err) {
                if (!err) {
                    res.send("Successfully updated selected article.");
                } else {
                    res.send(err);
                }
            });
    })

    .put(function (req, res) {

        const articleTitle = req.params.articleTitle;

        Article.findOneAndUpdate(
            { title: articleTitle },
            { title: req.body.newTitle, content: req.body.newContent },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Successfully updated the content of the selected article.");
                } else {
                    res.send(err);
                }
            });
    })

    .delete (function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndDelete(
        { title: articleTitle },
        function (err) {
            if (!err) {
                res.send("Successfully deleted selected article.");
            } else {
                res.send(err);
            }
        });
});





app.listen(3000, function () {
    console.log("server running at port 3000");
});