const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: 'You need a Category!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },

    categoryAuthor: {
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    
    items: [
        {
            itemName: {
                type: String,
                required: false,
                
            },
        
            quantity: {
                type: Number,
                required: false,
        
            },
        
            price: {
                type: Number, 
                required: false,
            },
        },
    ]
});

const Category = model('Category', categorySchema);

module.exports = Category;