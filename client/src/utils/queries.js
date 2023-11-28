import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    categories {
      categoryName
      createdAt
      item {
        _id
        itemName
        quantity
        price
      }
      _id
    }
  }
}
`;


