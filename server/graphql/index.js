const express = require('express');
const uuid = require('uuid');
const express_graphql = require('express-graphql');
const mediumScrapper = require('../helpers/medium_scrapper');
const { buildSchema } = require('graphql');

let articlesData = [];

const schema = buildSchema(`
    type Article {
        id: ID!
        title: String!
        author: String
        description: String!
        url: String!
        type: String!
        hidden: Boolean!
    }
    type Mutation {
        setArticleVisibility(id: Int!, visible: Boolean!): Article
    }
    type Query {
        article(id: Int!): Article
        articles(limit: Int ): [Article]
    },
`);

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

let root = {
    article: getArticle,
    articles: getArticles,
    setArticleVisibility: setArticleVisibility
};

module.exports = express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
});