const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {

    const { id } = req.body;
    await Promise.all([
        Model.findByIdAndDelete(id),
        Instance.deleteMany({ model: id }),
    ]).catch(next);

    res.redirect('/products-and-models');
};