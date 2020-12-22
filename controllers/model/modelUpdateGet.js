const Model = require('../../models/model');
const Product = require('../../models/product');
const Color = require('../../models/color');
const Category = require('../../models/category');

module.exports = async function (req, res, next) {

    const [model, products, colors, categories] = await Promise.all([
        Model.findById(req.params.id),
        Product.find(),
        Color.find(),
        Category.find(),
    ]).catch(next);

    res.render('model/model-form', { title: 'Update model', model, products, colors, categories });
};