const Fabric = require('../../models/fabric');

module.exports = async function (req, res, next) {
    const fabrics = await Fabric.find().catch(next);

    res.render('fabric/fabric-list', { title: 'All fabrics', fabrics });
};