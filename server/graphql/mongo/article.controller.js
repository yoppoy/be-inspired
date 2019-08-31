const uuid = require('uuid');
const mediumScrapper = require('../../helpers/medium_scrapper');
const Article = require('./article.model');

let articlesData = [];

const saveArticles = async (articles) => {
    let back = [];
    let tmp;

    articles.map((article) => {
        Article.findOrCreate(article.title).then((result) => {
            tmp = {...article, ...{id: result._id, visible: result.visible ?  result.visible : false}};
            back.push(tmp);
        });
    });
    return (back);
};

const setArticleVisibility = async (id, visible) => {
    Article.setVisibility(id, visible);
};

const scrapArticles = async () => {
    let scrappedArticles = await mediumScrapper();
    let articles = [];
    
    scrappedArticles.map(article => {
        if (!articles.filter(e => e.title === article.title).length > 0) {
            articles.push({
                title: article.title,
                author: article.author,
                description: article.description,
                url: article.url,
                image: article.image,
                type: 'Medium',
                visible: true
            })
        }
    });
    articles = await saveArticles(articles);
    articlesData = articles;
    return (articles);
};

module.exports = {
    scrapArticles,
};