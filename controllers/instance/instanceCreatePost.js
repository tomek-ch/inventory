const Model = require('../../models/model');
const Instance = require('../../models/instance');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('model', 'Please choose a model')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('size', 'Please choose a size')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('amount', 'Please pick an amount')
        .isInt({ min: 1 })
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { model, size, amount, available } = req.body;
        const instance = { model, size };
        instance.available = !!available;

        // console.log('The amount is ' + amount);
        // console.log('The size is ' + size);
        // console.log(instance);

        if (model && !await Model.findById(model).catch(next))
            errors.push({ msg: 'Invalid model' });
        
        if (errors.length) {
            const models = await Model.find().populate('product').populate('color').catch(next);
            return res.render('instance/instance-form', { title: 'Add new pieces', models, errors, model, createMode: true });
        }

        const instances = [];
        for (let i = 1; i <= amount; i++)
            instances.push(new Instance(instance).save());
        await Promise.all(instances);

        res.redirect('/instances');
    },
];