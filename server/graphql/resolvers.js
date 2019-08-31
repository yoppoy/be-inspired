const uuid = require('uuid');
const mediumScrapper = require('../helpers/medium_scrapper');
const {scrapArticles} = require('./mongo/article.controller');
const Article = require('./mongo/article.model');

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

const getArticles = async (args) => {
    let limit = (args.limit) ? args.limit : 0;
    let back = articlesData;

    if (limit > 0)
        back = articlesData.slice(limit);
    back = (args.editorMode ? back : back.filter((article) => article.visible));
    return back;
};

const setArticleVisibility = async ({id, visible}) => {
    let saved = await Article.setVisibility(id, visible);

    for (let index = 0; index < articlesData.length; index++) {
        if (JSON.stringify(articlesData[index].id) === JSON.stringify(id)) {
            articlesData[index].visible = saved.visible;
            return articlesData[index];
        }
    }
    return null;
};

module.exports = {
    initArticles,
    getArticle,
    getArticles,
    setArticleVisibility
};