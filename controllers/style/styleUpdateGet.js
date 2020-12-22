const Category = require('../../models/category');
const Style = require('../../models/style');

module.exports = async function (req, res, next) {

    const [style, categories] = await Promise.all([
        Style.findById(req.params.id), 
        Category.find(),
    ]);
    
    res.render('style/style-form', { title: 'Update style', categories, style });
};