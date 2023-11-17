const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    
        quantity: {
            type: Number,
            required: true,
    
        },
    
        price: {
            type: Number, 
            required: true,
        },
    },
    {
        toJSON: {}
    }
);

const Item = model('Item', itemSchema);

module.exports = Item;