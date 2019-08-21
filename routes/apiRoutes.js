const db = require("../models")

module.exports = function(app){

    app.get("/scrape", function(req, res){

        var test = {
            title: "Hello",
            link: "test.com"
        }

        db.Article.create(test).then((response)=>{
            res.json(response);
        })

    })

}