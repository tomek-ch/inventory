const Fabric = require('../../models/fabric');
const Product = require('../../models/product');

module.exports = async function (req, res, next) {
    const [fabric, allProducts] = await Promise.all([
        Fabric.findById(req.params.id),
        Product.find(),
    ]).catch(next);

    const products = allProducts.filter(product => product.fabric
        .map(fabric => fabric.type.toString())
        .includes(fabric._id.toString()));

    res.render('fabric/fabric-detail', { title: `Fabric - ${fabric.name}`, fabric, products });
};