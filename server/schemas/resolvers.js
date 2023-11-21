const { Catergory } = require('../models');

const resolvers = {
    // Query: {
    //     // populate the items and the subdoc category
    //     catergory: async () => {
    //         return await Catergory.find({});
    //     },
    // }

    Mutation: {
        addCategory: async (parent, categoryName ) => {
          return Catergory.create({ categoryName });
        },
        addItem: async (parent, { categoryId, itemName, quantity, price }) => {
          return Catergory.findOneAndUpdate(
            { _id: categoryId },
            {
              $addToSet: { items: { itemName, quantity, price } },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        },
      },
};

module.exports = resolvers;