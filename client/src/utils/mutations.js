import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($categoryName: String!) {
  addCategory(categoryName: $categoryName) {
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

export const ADD_ITEM = gql`
  mutation AddItem($categoryId: ID!, $itemName: String!, $quantity: Int!, $price: Int!) {
  addItem(categoryId: $categoryId, itemName: $itemName, quantity: $quantity, price: $price) {
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

