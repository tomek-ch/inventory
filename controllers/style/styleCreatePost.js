const Style = require('../../models/style');
const Category = require('../../models/category');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('name', 'Please provide a style name')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('category', 'Please provide a category')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { name, category } = req.body;
        const style = { name, category };

        if (name && category && await Style.findOne(style).catch(next))
            errors.push({ msg: 'A style with this name already exists in this category' });

        if (errors.length) {
            const categories = await Category.find();
            return res.render('style/style-form', { title: 'Add new style', style, errors, categories });
        }

        const newStyle = await new Style(style).save().catch(next);
        res.redirect(newStyle.url);
    },
];