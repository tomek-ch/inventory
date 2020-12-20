const { Schema, model } = require('mongoose');

const Instance = new Schema({
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    size: { type: Number, required: true },
    available: { type: Boolean, required: true },
});

Instance.virtual('url').get(function () {
    return `/instances/${this._id}`;
});

module.exports = model('Instance', Instance);