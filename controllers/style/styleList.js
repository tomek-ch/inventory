const Style = require('../../models/style');
const Category = require('../../models/category');

module.exports = async function (req, res, next) {
    const [categories, styles] = await Promise.all([
        Category.find(),
        Style.find()
            .populate('category'),
    ]).catch(next);

    // const categories = {};
    // styles.forEach(style => {
    //     categories[style.category.name] = [...(categories[style.category.name] || []), style];
    // });

    res.render('style/style-list', { title: 'All styles', categories, styles });
};