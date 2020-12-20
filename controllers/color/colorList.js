const Color = require('../../models/color')

module.exports = async function (req, res, next) {
    const colors = await Color.find().catch(next);
    res.render('color/color-list', { title: 'All colors', colors });
};