const db = require('../config/connection');
const { User, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Category', 'categories');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < categorySeeds.length; i++) {
      const { _id, categoryAuthor } = await Category.create(categorySeeds[i]);
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
