const { Catergory, Item } = require('../models');

const resolvers = {
    Query: {
        // populate the items and the subdoc category
        catergory: async () => {
            return await Catergory.find({}).populate('item').populate({
                path: 'item',
                populate: 'category'
            });
        },
        item: async () => {
            return await Item.find({}).populate('category');
        }
    }
};

module.exports = resolvers;