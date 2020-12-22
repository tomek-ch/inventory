const Instance = require('../../models/instance');
const Model = require('../../models/model');

module.exports = async function (req, res, next) {

    const [instance, models] = await Promise.all([
        Instance.findById(req.params.id),
        Model.find()
            .populate('product')
            .populate('color')
            .catch(next),
    ]);

    res.render('instance/instance-form', { title: 'Update piece', models, instance });
};