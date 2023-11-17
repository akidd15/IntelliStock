const { Schema, model } = require('mongoose');
const Item = require('./item');

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        items: [Item],
    }
);

const Category = model('Category', categorySchema);

module.exports = Category;