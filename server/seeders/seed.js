const db = require('../config/connection');
const { User, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const itemSeeds = require('./itemSeeds.json'); // Add this line
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Category', 'categories');
    await cleanDB('User', 'users');

    const users = await User.create(userSeeds);

    for (let i = 0; i < categorySeeds.length; i++) {
      const categorySeed = categorySeeds[i];

      // Create a category
      const { _id, categoryAuthor } = await Category.create({
        ...categorySeed,
        items: itemSeeds, // Add items to the category
      });

      // Find the user and update categories
      const user = await User.findOneAndUpdate(
        { username: categoryAuthor },
        {
          $addToSet: {
            categories: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
