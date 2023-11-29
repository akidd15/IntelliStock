import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    password
    categories {
      _id
      categoryName
      categoryAuthor
      createdAt
      items {
        _id
        itemName
        quantity
        price
      }
    }
  }
}
`;

export const QUERY_CATEGORIES = gql`
  query getCategories($username: String) {
    categories(username: $username) {
      _id
      categoryName
      categoryAuthor
      createdAt
      items {
        _id
        itemName
        quantity
        price
      }
    }
  }
`;

export const QUERY_SINGLE_CATEGORY = gql`
  query getSingleCategory($categoryId: ID!) {
  category(categoryId: $categoryId) {
    _id
    categoryName
    categoryAuthor
    createdAt
    items {
      _id
      itemName
      quantity
      price
    }
  }
}
`;

export const QUERY_ITEMS_BY_AUTHOR = gql`
  query ItemsByAuthor($categoryAuthor: String) {
    itemsByAuthor(categoryAuthor: $categoryAuthor) {
      _id
      itemName
      quantity
      price
    }
  }
`
