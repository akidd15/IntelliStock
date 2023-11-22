const { Catergory, User } = require('../models');

const resolvers = {
    // Query: {
    //     // populate the items and the subdoc category
    //     catergory: async () => {
    //         return await Catergory.find({});
    //     },
    // }

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