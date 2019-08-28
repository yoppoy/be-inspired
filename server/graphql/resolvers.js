const uuid = require('uuid');
const mediumScrapper = require('../helpers/medium_scrapper');

let articlesData = [];

let getArticle = (args) => {
    let id = args.id;

    return articlesData.filter(article => {
        return article.id === id;
    })[0];
};

let scrapArticles = async function(args) {
    let articles = await mediumScrapper();

    articles.map(article => {
        if (!articlesData.filter(e => e.title === article.title).length > 0) {
            articlesData.push({
                id: uuid.v1(),
                title: article.title,
                author: article.author,
                description: article.description,
                url: article.url,
                type: 'Medium',
                hidden: false
            })
        }
    });
};

let getArticles = async function(args) {
    let limit = (args.limit) ? args.limit : 0;

    await scrapArticles();
    if (limit > 0)
        return articlesData.slice(limit);
    return articlesData;
};

let setArticleVisibility = function({id, visible}) {
    articlesData.map(article => {
        if (article.id === id) {
            article.hidden = !visible;
            return article;
        }
    });
    return articlesData.filter(article => article.id === id) [0];
};

module.exports = {
    getArticle,
    getArticles,
    setArticleVisibility
};