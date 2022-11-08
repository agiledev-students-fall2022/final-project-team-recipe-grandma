const mongoose = require('mongoose');

const Ingredient = mongoose.Schema({
    ingredient: {
        type: String,
        required: [true, 'Please add a ingredient'],
    },
    type: {
        type: String,
        require: [true, 'Please add a ingredient type'],
    }
});

module.exports = mongoose.model('Ingredient', Ingredient);
