const { Category, User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('categories');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('categories');
    },
    categories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Category.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { categoryId }) => {
      return Category.findOne({ _id: categoryId });
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
        { $addToSet: { category: category._id } }
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