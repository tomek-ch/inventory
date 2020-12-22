const Model = require('../../models/model');
const Product = require('../../models/product');
const Color = require('../../models/color');
const Category = require('../../models/category');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('product', 'Please specify a product')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('color', 'Please specify a color')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('gender', 'Please choose gender')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('sizes', 'Please provide at least one size')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { product, color, gender, sizes } = req.body;
        const model = { product, color, gender };

        model.sizes = sizes.split(',').map(size => size.trim());
        if (!model.sizes.length)
            errors.push({ msg: 'Please provide at least one size' });

        const foundProduct = await Product.findById(product).populate('category');
        const foundColor = await Color.findById(color);

        if (color && !foundColor) errors.push({ msg: 'Invalid color' });
        if (product && !foundProduct) errors.push({ msg: 'Invalid product' });
        else if (product) {
            const categoryGender = foundProduct.category.gender;
            const allowedGenders = categoryGender === 'Both' ? ['Men', 'Women', 'Unisex'] : [categoryGender];
            if (!allowedGenders.includes(gender))
                errors.push({ msg: 'Invalid gender for chosen product\'s category' });
        }

        if (errors.length) {

            const [products, colors, categories] = await Promise.all([
                Product.find(),
                Color.find(),
                Category.find(),
            ]).catch(next);

            return res.render('model/model-form', {
                title: 'Add new model', model, products, colors, categories, errors
            });
        }

        const newModel = await new Model(model).save().catch(next);
        res.redirect(newModel.url);
    },
];