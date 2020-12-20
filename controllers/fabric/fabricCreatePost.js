const Fabric = require('../../models/fabric');
const { body, validationResult } = require('express-validator');

module.exports = [

    body('name', 'Please provide a name for the fabric')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        const { name } = req.body;
        const fabric = { name };

        if (await Fabric.findOne(fabric).catch(next))
            errors.push({ msg: 'Fabric with this name already exists' });
        
        if (errors.length) 
            return res.render('fabric/fabric-form', { title: 'Add new fabric', errors, fabric });

        const newFabric = await new Fabric(fabric).save().catch(next);
        res.redirect(newFabric.url);
    },
];