const Product = require('../../models/product');
const Model = require('../../models/model');

module.exports = async function (req, res, next) {
    const [products, models] = await Promise.all([
        Product.find(),
        Model.find()
            .populate('product')
            .populate('color'),
    ]).catch(next);

    res.render('product/product-list', { title: 'All products and models', products, models });
};