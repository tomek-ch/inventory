const Category = require('../../models/category');
const Style = require('../../models/style');
const Fabric = require('../../models/fabric');

module.exports = async function (req, res, next) {

    const [categories, styles, fabrics] = await Promise.all([
        Category.find(),
        Style.find(),
        Fabric.find(),
    ]).catch(next);

    res.render('product/product-form', { title: 'Add new product', categories, styles, fabrics });
};