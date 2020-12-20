const Instance = require('../../models/instance');
const Model = require('../../models/model');

module.exports = async function (req, res, next) {
    const [instances, models] = await Promise.all([
        Instance
            .find()
            .populate('model'),
        Model
            .find()
            .populate('product')
            .populate('color'),
    ]).catch(next);

    res.render('instance/instance-list', { title: 'All pieces', instances, models });
};