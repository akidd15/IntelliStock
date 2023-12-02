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
  mutation addCategory($categoryName: String!,$categoryAuthor: String!) {
  addCategory(categoryName: $categoryName, categoryAuthor: $categoryAuthor) {
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
  mutation AddItem($categoryId: ID!, $itemName: String, $quantity: Int, $price: Float) {
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

export const UPDATE_ITEM = gql`
  mutation UpdateItem($itemId: ID!, $itemName: String, $quantity: Int, $price: Float) {
    updateItem(itemId: $itemId, itemName: $itemName, quantity: $quantity, price: $price) {
      _id
      itemName
      quantity
      price
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation RemoveItem($itemId: ID!) {
  removeItem(itemId: $itemId) {
    _id
    itemName
    quantity
    price
  }
}
`