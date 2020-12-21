const Product = require('../../models/product');
const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {

    const { id } = req.body;
    const models = await Model.find({ product: id }).catch(next);

    await Promise.all([
        Model.deleteMany({ product: id }),
        Product.findByIdAndDelete(id),
        ...models.map(model => Instance.deleteMany({ model: model._id })),
    ]).catch(next);

    res.redirect('/products-and-models');
};