const Style = require('../../models/style');
const Product = require('../../models/product');

module.exports = async function (req, res, next) {
    const [style, products] = await Promise.all([
        Style.findById(req.params.id).populate('category'),
        Product.find({ style: req.params.id }),
    ]).catch(next);

    res.render('style/style-detail', { title: `Style - ${style.name}`, style, products });
};