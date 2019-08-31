const uuid = require('uuid');
const mediumScrapper = require('../helpers/medium_scrapper');
const {scrapArticles} = require('./mongo/article.controller');

let articlesData = [];

const initArticles = async () => {
    articlesData = await scrapArticles();
};

const getArticle = (args) => {
    let id = args.id;

    return articlesData.filter(article => {
        return article.id === id;
    })[0];
};

const getArticles = async function(args) {
    let limit = (args.limit) ? args.limit : 0;

    //await scrapArticles();
    if (limit > 0)
        return articlesData.slice(limit);
    return articlesData;
};

const setArticleVisibility = function({id, visible}) {
    articlesData.map(article => {
        if (article.id === id) {
            article.visible = !visible;
            return article;
        }
    });
    return articlesData.filter(article => article.id === id) [0];
};

module.exports = {
    initArticles,
    getArticle,
    getArticles,
    setArticleVisibility
};