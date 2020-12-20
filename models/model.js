const { Schema, model } = require('mongoose');

const Model = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    color: { type: Schema.Types.ObjectId, ref: 'Color' },
    gender: { type: String, required: true, enum: ['Men', 'Women', 'Unisex'], },
    sizes: [{ type: String }],
});

Model.virtual('url').get(function () {
    return `/models/${this._id}`;
});

module.exports = model('Model', Model);