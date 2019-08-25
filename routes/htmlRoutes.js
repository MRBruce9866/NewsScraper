const db = require("../models");

module.exports = app => {

app.get("/", (req, res) => {
    db.Article.find({}).populate("reviews").then(data => {
        res.render("index", {articles: data});
    }).catch(err => {
        res.json(err);
    })
    
})

}