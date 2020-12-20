const { Schema, model } = require('mongoose');

const Fabric = new Schema({
    name: { type: String, required: true },
});

Fabric.virtual('url').get(function () {
    return `/fabrics/${this._id}`;
});

module.exports = model('Fabric', Fabric);
