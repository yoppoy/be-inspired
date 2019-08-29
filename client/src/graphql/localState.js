import {gql} from "apollo-boost";

export const GQL_EDITOR_MODE = gql`
    {
        editorMode @client
    }
`;