const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {
    const [model, instances] = await Promise.all([
        Model
            .findById(req.params.id)
            .populate('product')
            .populate('color'),
        Instance.find({ model: req.params.id }),
    ]).catch(next);

    res.render('model/model-detail', {
        title: `Model - ${model.product.name.toLowerCase()} in ${model.color.name.toLowerCase()}`,
        model,
        instances,
    });
};