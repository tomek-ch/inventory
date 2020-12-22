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

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { model, size, amount, available } = req.body;
        const instance = { model, size };
        instance.available = !!available;

        if (model && !await Model.findById(model).catch(next))
            errors.push({ msg: 'Invalid model' });
        
        if (errors.length) {
            const models = await Model.find().populate('product').populate('color').catch(next);
            return res.render('instance/instance-form', { title: 'Add new pieces', models, errors, model });
        }

        const updatedInstance = await Instance.findByIdAndUpdate(req.params.id, instance).catch(next);
        res.redirect(updatedInstance.url);
    },
];