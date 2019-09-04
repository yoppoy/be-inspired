const uuid = require('uuid');
const mediumScrapper = require('../../helpers/medium_scrapper');
const Article = require('./article.model');

let articlesData = [];

const saveArticle = (article) => {
    let tmp;

    return (new Promise((resolve, reject) => {
        Article.findOrCreate(article.title).then((result, err) => {
            if (err)
                reject(err);
            tmp = {...article, ...{id: result._id, visible: result.visible ? result.visible : false}};
            resolve(tmp);
        });
    }));
};

const saveArticles = async (articles) => {
    let back = [];
    const start = new Date();
    let promises = [];
    let promise;

    try {
        articles.map((article, index) => {
            promise = saveArticle(article);
            promise.then((article) => {
                back.push(article);
            });
            promises.push(promise);
        });
        await Promise.all(promises);
        console.log(`Saved: ${back.length} articles in ${new Date() - start}ms`);
    } catch (e) {
        console.log("Error : ", e);
    }
    return (back);
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
                type: 'Medium'
            })
        }
    });
    articles = await saveArticles(articles);
    articlesData = articles;
    return (articles);
};

module.exports = {
    scrapArticles
};