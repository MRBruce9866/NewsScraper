const db = require("../models")
const axios = require("axios");
const cheerio = require("cheerio");



module.exports = function(app){

    app.get("/scrape", function(req, res){

    axios.get("https://www.tmz.com/").then((response) => {
        const articles = [];

        const $ = cheerio.load(response.data);
        $(".blogroll .article").each((index,data) => {
            if(data){
                const article = {};
                article.title = [];
                $(data).children(".article__header").find(".article__header-title").children("span").each((index, data) => {
                    article.title.push($(data).text().trim());
                });
                article.link = $(data).children(".article__header").children("a").attr("href");
                article.image = $(data).children(".article__blocks").find("img").attr("src");
                article.snippet = $(data).children(".article__blocks").children("section:nth-child(2)").text().trim();
                articles.push(article);''
            }
            
        })

        

    })

    })

}