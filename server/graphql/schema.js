const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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