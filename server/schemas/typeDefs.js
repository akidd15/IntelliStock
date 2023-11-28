const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        categories: [Category]!
    }

    type Category{
        _id: ID
        categoryName: String
        categoryAuthor: String
        createdAt: String
        items: [Item]!
    }

    type Item {
        _id: ID
        itemName: String
        quantity: Int
        price: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        categories(username: String): [Category]
        category(categoryId: ID!): Category
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addCategory(categoryName: String!, categoryAuthor: String!): Category
        addItem(categoryId: ID!, itemName: String!, quantity: Int!, price: Int!): Category
    }
`

module.exports = typeDefs;