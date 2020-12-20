const Color = require('../../models/color');
const Model = require('../../models/model');
const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {
    
    // await Promise.all([
    //     Color.findByIdAndDelete(req.body.id),
    //     Model.remove({ color: req.body.id }),
    // ]);

    // Instance.remove({ color: req.body.id })

    res.send('helllo');
};