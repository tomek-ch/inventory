const Color = require('../../models/color');

module.exports = async function (req, res, next) {
    
    const color = await Color.findById(req.params.id).catch(next);
    res.render('color/color-form', { title: 'Update color', color });
};