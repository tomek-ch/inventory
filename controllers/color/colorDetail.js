const Color = require('../../models/color');
const Model = require('../../models/model');

module.exports = async function (req, res, next) {
    const [color, models] = await Promise.all([
        Color.findById(req.params.id),
        Model
            .find({ color: req.params.id })
            .populate('product'),
    ]).catch(next);

    res.render('color/color-detail', { title: `Color - ${color.name}`, color, models });
};