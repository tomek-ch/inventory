const Color = require('../../models/color');
const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {
    
    const { id } = req.body;
    const models = await Model.find({ color: id }).catch(next);

    await Promise.all([
        Color.findByIdAndDelete(id),
        Model.deleteMany({ color: id }),
        ...models.map(model => Instance.deleteMany({ model })),
    ]).catch(next);

    res.redirect('/colors');
};