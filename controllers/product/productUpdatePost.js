const Product = require('../../models/product');
const Category = require('../../models/category');
const Style = require('../../models/style');
const Fabric = require('../../models/fabric');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('name', 'Please provide a product name')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('category', 'Please choose a category')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('price', 'Please provide a price')
        .trim()
        .isDecimal()
        .escape(),

    body('description')
        .trim()
        .escape(),

    body('fabric', 'Please specify a fabric')
        .isLength({ min: 1 }),
    
    body('fabric.*')
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { name, category, price, description } = req.body;
        const product = { name, category, price, description };

        // Turn styles and fabrics into arrays
        const style =
            req.body.style ? req.body.style.constructor === Array ? req.body.style : [req.body.style] : [];
        const fabricArr =
            req.body.fabric ? req.body.fabric.constructor === Array ? req.body.fabric : [req.body.fabric] : [];

        // Create an array of objects in the format of { type: 'Cotton', percentage: 70 }
        const fabric = fabricArr.map(type => ({
            type,
            percentage: Number(req.body[`${type}_percentage`]),
        }));

        // Check if the category exists
        if (!await Category.findById(category).catch(next)) {
            errors.push({ msg: 'Provided category is invalid' });
        }

        // Check if styles exist and if they belong to chosen category
        const areStylesOk = (await Promise.all(
            style.map(style => Style.findById(style))
        ).catch(next))
            .every(style => style?.category.toString() === category);
        if (!areStylesOk) errors.push({ msg: 'Provided styles are invalid' });

        // Check if fabrics exist
        if (!(await Promise.all(fabricArr.map(id => Fabric.findById(id))).catch(next)).every(x => x)) {
            errors.push({ msg: 'Provided fabric type is invalid' });
        }

        // Check if percentages are correct
        if (fabric.reduce((acc, curr) => acc + curr.percentage, 0) !== 100) {
            errors.push({ msg: 'The sum of all fabric percentages must be 100' });
        }
        
        product.style = style;
        product.fabric = fabric;

        if (errors.length) {

            const [styles, categories, fabrics] = await Promise.all([
                Style.find(),
                Category.find(),
                Fabric.find(),
            ]).catch(next);

            const percentages = product.fabric.reduce((acc, curr) => ({
                ...acc,
                [curr.type]: curr.percentage,
            }), {});

            return res.render('product/product-form',
                { title: 'Update product', errors, product, styles, categories, fabrics, percentages });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product).catch(next);
        res.redirect(updatedProduct.url);
    },
];