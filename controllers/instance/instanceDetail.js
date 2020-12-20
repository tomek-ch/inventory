const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {
    const instance = await Instance
        .findById(req.params.id)
        .populate('model')
        .populate({
            path: 'model',
            populate: {
                path: 'product',
                model: 'Product',
            }
        })
        .populate({
            path: 'model',
            populate: {
                path: 'color',
                model: 'Color',
            }
        })
        .catch(next);

    res.render('instance/instance-detail', {
        title: `Piece - ${instance.model.product.name}, ${instance.model.sizes[instance.size]}, ${instance.available ? 'Available' : 'Unavailable'}`,
        instance
    });
};