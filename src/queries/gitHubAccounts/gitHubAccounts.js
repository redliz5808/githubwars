import { gql } from "@apollo/client";

const GITHUB_ACCOUNTS = gql`
  query GetAccountInfo($name: String!) {
    user(login: $name) {
      name
      login
      databaseId
      followers {
        totalCount
      }
      repositories {
        totalCount
      }
      gists {
        totalCount
      }
    }
  }
`;

export default GITHUB_ACCOUNTS;
