const Model = require('../../models/model');

module.exports = async function (req, res, next) {
    const models = await Model.find()
        .populate('product')
        .populate('color')
        .catch(next);
    res.render('model/model-list', { title: 'All models', models });
};