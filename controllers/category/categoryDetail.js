const Category = require('../../models/category');
const Product = require('../../models/product');

module.exports = async function (req, res, next) {
    const [category, products] = await Promise.all([
        Category.findById(req.params.id),
        Product.find({category: req.params.id}),
    ]).catch(next);

    res.render('category/category-detail', { title: `Category - ${category.name}`, category, products });
};