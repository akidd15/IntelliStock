const typeDefs = `
type Category{
    _id: ID
    name: String
}

type Item {
    _id: ID
    name: String
    quantity: Int
    price: Int
}`


module.exports = typeDefs;
// do we need ID? 