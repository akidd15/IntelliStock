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

    type Query {
        user: [User]
        category: [Category]!
        item: [Item]!
    }

    type Mutation {
        addCategory(categoryName: String!): Category
        addItem(categoryId: ID!, itemName: String!, quantity: Int!, price: Int!): Category
    }
`


module.exports = typeDefs;
// do we need ID? 