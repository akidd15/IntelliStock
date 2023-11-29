const { Category, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('categories');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('categories');
    },
    categories: async (parent , { username }) => {
      const params = username ? { categoryAuthor: username } : {};
      return Category.find(params).sort({ createdAt: -1 }).populate('items');
    },    
    category: async (parent, { categoryId }) => {
      return Category.findOne({ _id: categoryId });
    },
    itemsByAuthor: async (parent, { categoryAuthor }) => {
      const params = categoryAuthor ? { categoryAuthor } : {};
      const categories = await Category.find(params);
      const items = categories.flatMap(category => category.items);
      return items;
    },
    item: async (parent, { itemId }) => {
      return Category.findOne({
        'items._id': itemId
      }).then(category => {
        // Find and return the item with the specified itemId
        return category ? category.items.find(item => item._id.toString() === itemId) : null;
      });
    },
    
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addCategory: async (parent, { categoryName, categoryAuthor } ) => {
      const category = await Category.create({ categoryAuthor, categoryName });

      await User.findOneAndUpdate(
        { username: categoryAuthor },
        { $addToSet: { categories: category._id } }
      );

      return category;
    },

    addItem: async (parent, { categoryId, itemName, quantity, price }) => {
      return Category.findOneAndUpdate(
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