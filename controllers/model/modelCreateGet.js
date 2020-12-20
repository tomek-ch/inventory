const Product = require('../../models/product');
const Color = require('../../models/color');
const Category = require('../../models/category');

module.exports = async function (req, res, next) {

    const [products, colors, categories] = await Promise.all([
        Product.find(),
        Color.find(),
        Category.find(),
    ]).catch(next);

    res.render('model/model-form', { title: 'Add new model', products, colors, categories });
};