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
        if (name && await Category.findOne({ name }).catch(next))
            errors.push({ msg: 'Category with this name already exists' });

        if (errors.length)
            return res.render('category/category-form', { title: 'Add new category', errors, category });

        const newCategory = await new Category(category).save().catch(next);
        res.redirect(newCategory.url);
    },
];