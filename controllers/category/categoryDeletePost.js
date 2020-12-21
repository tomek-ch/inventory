const Category = require('../../models/category');
const Style = require('../../models/style');
const Product = require('../../models/product');
const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {

    const { id } = req.body;
    
    const products = await Product.find({ category: id }).catch(next);
    const models = (await Promise.all(
        products.map(product => Model.find({ product: product._id }))
    ).catch(next)).flat();
    
    await Promise.all([
        Category.findByIdAndDelete(id),
        Style.deleteMany({ category: id }),
        Product.deleteMany({ category: id }),
        ...products.map(product => Model.deleteMany({ product: product._id })),
        ...models.map(model => Instance.deleteMany({ model: model._id })),
    ]).catch(next);

    res.redirect('/categories-and-styles');
};