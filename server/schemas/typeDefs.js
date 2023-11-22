const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        category: [Category]!
    }

    type Category{
        _id: ID
        categoryName: String
        createdAt: String
        item: [Item]!
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
        user: [User]
        category: [Category]!
        item: [Item]!
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addCategory(categoryName: String!): Category
        addItem(categoryId: ID!, itemName: String!, quantity: Int!, price: Int!): Category
    }
`


module.exports = typeDefs;
// do we need ID? 