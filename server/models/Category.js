const { Schema, model } = require('mongoose');


const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        items: [
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
        ]
    }
);

const Category = model('Category', categorySchema);

module.exports = Category;