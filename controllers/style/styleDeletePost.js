const Style = require('../../models/style');
const Product = require('../../models/product');

module.exports = async function (req, res, next) {

    const { id } = req.body;

    await Promise.all([
        Style.findByIdAndDelete(id),
        Product.updateMany({ style: id }, { $pullAll: { style: [id] } }),
    ]).catch(next);

    res.redirect('/categories-and-styles');
};