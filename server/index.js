const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Article {
        id: Int
        title: String
        author: String
        description: String
        url: String,
        hidden: Boolean
    }
    type Mutation {
        setArticleVisibility(id: Int!, visible: Boolean!): Article
    }
    type Query {
        article(id: Int!): Article
        articles(limit: Int ): [Article]
    },
`);

const articlesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Article',
        author: 'Brad Traversy',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        url: 'https://codingthesmartway.com/articles/nodejs/',
        hidden: false
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        url: 'https://codingthesmartway.com/articles/nodejs-express-mongodb/',
        hidden: false
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript article for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        url: 'https://codingthesmartway.com/articles/understand-javascript/',
        hidden: false
    }
];

let getArticle = (args) => {
    let id = args.id;

    return articlesData.filter(article => {
        return article.id === id;
    })[0];
};

let getArticles = function(args) {
    let limit = (args.limit) ? args.limit : 0;

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

var root = {
    article: getArticle,
    articles: getArticles,
    setArticleVisibility: setArticleVisibility
};

let app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));