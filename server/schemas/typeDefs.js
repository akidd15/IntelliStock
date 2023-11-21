const typeDefs = `
    type Category{
        _id: ID
        name: String
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
`


module.exports = typeDefs;
// do we need ID? 