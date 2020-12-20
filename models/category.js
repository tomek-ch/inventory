const { Schema, model } = require('mongoose');

const Category = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Both', 'Men', 'Women'] },
});

Category.virtual('url').get(function () {
    return `/categories/${this._id}`;
});

module.exports = model('Category', Category);