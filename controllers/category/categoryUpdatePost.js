const Category = require('../../models/category');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('name', 'Please enter a name for the category')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('gender', 'Please enter a gender')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { name, gender } = req.body;
        const category = { name, gender }

        if (!['Men', 'Women', 'Both'].includes(gender)) errors.push({ msg: 'Invalid gender' });

        if (errors.length)
            return res.render('category/category-form', { title: 'Update category', errors, category });

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category).catch(next);
        res.redirect(updatedCategory.url);
    },
];