import {gql} from "apollo-boost";

export const GQL_QUERY_ARTICLES = gql`
    {
        articles {
            id
            title
            author
            description
            url
            image
            type
            visible
        }
    }
`;

export const GQL_QUERY_ARTICLES_EDITOR = gql`
    {
        articles(editorMode: true) {
            id
            title
            author
            description
            url
            image
            type
            visible
        }
    }
`;

export const GQL_MUTATION_ARTICLES = gql`
    mutation  setArticleVisibility($id: ID!, $visible: Boolean!) {
        setArticleVisibility(id: $id, visible: $visible) {
            visible
        }
    }
`;