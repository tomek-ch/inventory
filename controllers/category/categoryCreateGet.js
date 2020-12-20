module.exports = function (req, res, next) {
    res.render('category/category-form', { title: 'Add new category' });
};