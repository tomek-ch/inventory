const Product = require('../../models/product');
const Category = require('../../models/category');
const Style = require('../../models/style');
const Fabric = require('../../models/fabric');

module.exports = async function (req, res, next) {

    const [product, categories, styles, fabrics] = await Promise.all([
        Product.findById(req.params.id),
        Category.find(),
        Style.find(),
        Fabric.find(),
    ]).catch(next);

    const percentages = product.fabric.reduce((acc, curr) => ({
        ...acc,
        [curr.type]: curr.percentage,
    }), {});

    res.render('product/product-form',
        { title: 'Update product', categories, styles, fabrics, product, percentages });
};