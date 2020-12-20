const Category = require('../models/category');
const Color = require('../models/color');
const Fabric = require('../models/fabric');
const Instance = require('../models/instance');
const Model = require('../models/model');
const Product = require('../models/product');
const Style = require('../models/style');

module.exports = async function (req, res, next) {

    const countsArr = await Promise.all([Category, Color, Fabric, Instance, Model, Product, Style]
        .map(thing => thing.countDocuments()))
        .catch(error => res.render('index', { title: 'Inventory manager', error }));
    
    const names = ['category', 'color', 'fabric', 'instance', 'model', 'product', 'style'];
    const count = countsArr.reduce((acc, curr, idx) => ({ ...acc, [names[idx]]: curr }), {});

    res.render('index', { title: 'Inventory manager', count });
};