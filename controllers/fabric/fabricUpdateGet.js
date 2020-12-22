const Fabric = require('../../models/fabric');

module.exports = async function (req, res, next) {

    const fabric = await Fabric.findById(req.params.id);
    res.render('fabric/fabric-form', { title: 'Update fabric', fabric });
};