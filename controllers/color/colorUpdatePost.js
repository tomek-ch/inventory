const Color = require('../../models/color');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('name', 'Please provide a color name')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('hex', 'Please choose an appropriate color representation')
        .trim()
        .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { name, hex } = req.body
        const color = { name, hex };
        if (errors.length) return res.render('color/color-form', { title: 'Update color', color, errors });
        
        const updatedColor = await Color.findByIdAndUpdate(req.params.id, color).catch(next);
        res.redirect(updatedColor.url);
    },
];