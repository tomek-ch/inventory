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

        if (errors.length) {
            const categories = await Category.find();
            return res.render('style/style-form', { title: 'Update style', style, errors, categories });
        }

        const updatedStyle = await Style.findByIdAndUpdate(req.params.id, style).catch(next);
        res.redirect(updatedStyle.url);
    },
];