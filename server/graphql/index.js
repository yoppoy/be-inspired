const express_graphql = require('express-graphql');
const schema = require('./schema');
const { getArticle, getArticles, setArticleVisibility } = require('./resolvers');

module.exports = express_graphql({
    schema: schema,
    rootValue: {
        article: getArticle,
        articles: getArticles,
        setArticleVisibility: setArticleVisibility
    },
    graphiql: true
});