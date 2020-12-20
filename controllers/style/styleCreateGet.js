const Category = require('../../models/category');

module.exports = async function (req, res, next) {

    const categories = await Category.find();
    res.render('style/style-form', { title: 'Add new style', categories });
};