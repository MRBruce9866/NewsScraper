const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");



module.exports = function (app) {

    app.get("/api/scrape", function (req, res) {

        scrapeTMZ(data => {
            const articles = data;
            res.status(200).end();
        });

    })

    app.get("/api/articles", function (req, res) {

        db.Article.find({}).then(data => {
            res.json(data);
        })

    })

}

function scrapeTMZ(cb) {
    axios.get("https://www.tmz.com/").then((response) => {
        const articles = [];
        db.Article.remove({}, () => {
            const $ = cheerio.load(response.data);
            $(".blogroll .article").each((index, data) => {
                if (data) {
                    const article = {};
                    article.title = [];
                    $(data).children(".article__header").find(".article__header-title").children("span").each((index, data) => {
                        article.title.push($(data).text().trim());
                    });
                    article.link = $(data).children(".article__header").children("a").attr("href");
                    article.image = $(data).children(".article__blocks").find("img").attr("src");

                    let snippetsLong = $(data).children(".article__blocks").children("section:nth-child(2)").text().trim().split(" ");
                    let snippetsShort;
                    let snippet;
                    if(snippetsLong.length > 20){
                        snippetsShort= snippetsLong.slice(0,19);
                        snippetsShort.push("...");
                        snippet= snippetsShort.join(" ");
                    }else{
                        snippet = snippetsLong.join(" ");
                    }
                     

                    console.log(snippet);
                    article.snippet = `${snippet}`;
                    articles.push(article);
                    db.Article.create(article).then(data => console.log("Success")).catch(err => console.log(err));
                }

            })
            
            cb(articles);
        });
    })
};