const typeDefs = `
    type Category{
        _id: ID
        name: String
        createdAt: String
        item: [Item]!
    }

    type Item {
        _id: ID
        name: String
        quantity: Int
        price: Int
    }

    type Query {
        category: [Category]!
        item: [Item]!
    }

    type Mutation {
        addCategory(name: String!): Category
        addItem(categoryId: ID!, name: String!, quantity: Int!, price: Int!): Category
    }
`


module.exports = typeDefs;
// do we need ID? 