const Category = require('../models/category');
const Style = require('../models/style');
const Product = require('../models/product');
const Model = require('../models/model');
const Instance = require('../models/instance');
const Color = require('../models/color');
const Fabric = require('../models/fabric');


var userArgs = process.argv.slice(2);

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const category = new Category({ name: 'test category', gender: 'Both' });
const style = new Style({ name: 'test style', category });

const fabric = new Fabric({ name: 'test fabric' });
const color = new Color({ name: 'test color', hex: '#000' });

const product = new Product({
    name: 'test product',
    category,
    description: 'test description',
    price: 1,
    style: [style],
    fabric: [{ type: fabric, percentage: 100 }],
});

const model = new Model({ product, sizes: ['S', 'M'], gender: 'Unisex', color });
const instance = new Instance({ model, size: 0, available: true });

Promise
    .all([category, style, fabric, color, product, model, instance].map(item => item.save()))
    .then(() => mongoose.connection.close());