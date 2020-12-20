const { Schema, model } = require('mongoose');

const Style = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

Style.virtual('url').get(function () {
    return `/styles/${this._id}`;
});

module.exports = model('Style', Style);