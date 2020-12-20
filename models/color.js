const { Schema, model } = require('mongoose');

const Color = new Schema({
    name: { type: String, required: true },
    hex: { type: String, required: true },
});

Color.virtual('url').get(function () {
    return `/colors/${this._id}`;
});

module.exports = model('Color', Color);