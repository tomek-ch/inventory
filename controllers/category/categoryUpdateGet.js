const Category = require('../../models/category');

module.exports = async function (req, res, next) {
    const category = await Category.findById(req.params.id).catch(next);
    res.render('category/category-form', { title: 'Update category', category });
};