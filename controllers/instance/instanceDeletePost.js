const Instance = require('../../models/instance');

module.exports = async function (req, res, next) {
    await Instance.findByIdAndDelete(req.body.id).catch(next);
    res.redirect('/instances');
};