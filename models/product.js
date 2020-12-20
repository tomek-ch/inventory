const { Schema, model } = require('mongoose');

const Fabric = new Schema({
    type: { type: Schema.Types.ObjectId, ref: 'Fabric', required: true },
    percentage: { type: Number, required: true },
});

const Product = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    style: [{ type: Schema.Types.ObjectId, ref: 'Style' }],
    price: { type: Number, required: true },
    description: { type: String },
    fabric: { type: [Fabric], required: true },
});

Product.virtual('url').get(function () {
    return `/products/${this._id}`;
});

module.exports = model('Product', Product);