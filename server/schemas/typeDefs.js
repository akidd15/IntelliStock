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
        price: Float
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
        itemsByAuthor(categoryAuthor: String): [Item]
        item(itemId: ID!): Item
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addCategory(categoryName: String!, categoryAuthor: String!): Category
        addItem(categoryId: ID!, itemName: String, quantity: Int, price: Float): Category
        updateItem(itemId: ID!, itemName: String, quantity: Int, price: Float): Item
        removeCategory(categoryId: ID!, userId: ID!): Category
        removeItem(categoryId: ID!, itemId: ID!): Category
    }
`
// removeCategory wont need userId once context is enabled in resolvers

module.exports = typeDefs;