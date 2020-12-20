const Product = require('../../models/product');
const Model = require('../../models/model');

module.exports = async function (req, res, next) {
    const [product, models] = await Promise.all([
        Product
            .findById(req.params.id)
            .populate('category')
            .populate('style')
            .populate({ path: 'fabric', populate: { path: 'type', model: 'Fabric' } }),
        Model.find({ product: req.params.id }).populate('color'),
    ]).catch(next);

    res.render('product/product-detail', { title: `Product - ${product.name}`, product, models });
};