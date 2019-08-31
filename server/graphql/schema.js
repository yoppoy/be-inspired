const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Article {
        id: ID!
        title: String!
        author: String
        description: String!
        image: String
        url: String!
        type: String!
        visible: Boolean!
    }
    type Mutation {
        setArticleVisibility(id: ID!, visible: Boolean!): Article
    }
    type Query {
        article(id: Int!): Article
        articles(limit: Int, editorMode: Boolean ): [Article]
    },
`);