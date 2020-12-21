const Fabric = require('../../models/fabric');
const Product = require('../../models/product');
const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {

    const { id } = req.body;

    const products = (await Product.find().catch(next))
        .filter(product => product.fabric
            .find(fabric => fabric.type.toString() === id));

    const models = (await Promise.all(
        products.map(product => Model.find({ product }))
    ).catch(next)).flat();

    await Promise.all([
        Fabric.findByIdAndDelete(id),
        ...products.map(product => Product.findByIdAndDelete(product)),
        ...products.map(product => Model.deleteMany({ product })),
        ...models.map(model => Instance.deleteMany({ model })),
    ]).catch(next);

    res.redirect('/fabrics');
};