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

        const foundColor = await Color.findOne({ name }).catch(next);
        if (foundColor) errors.push({ msg: 'Color with specified name already exists' });
        if (errors.length) return res.render('color/color-form', { title: 'Add new color', color, errors });
        
        const newColor = await new Color(color).save().catch(next);
        res.redirect(newColor.url);
    },
];