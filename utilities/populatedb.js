const Fabric = require('../models/fabric');
const Color = require('../models/color');
const Category = require('../models/category');
const Style = require('../models/style');
const Product = require('../models/product');
const Model = require('../models/model');
const Instance = require('../models/instance');

var userArgs = process.argv.slice(2);

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const fabrics = [
    { name: 'Cotton' },
    { name: 'Leather' },
    { name: 'Polyester' },
    { name: 'Linen' },
    { name: 'Wool' },
    { name: 'Viscose' },
]
    .map(fabric => new Fabric(fabric));

const colors = [
    { name: 'Red', hex: '#fc0303' },
    { name: 'Beige', hex: '#e1c699' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Orange', hex: '#ed7014' },
    { name: 'Light blue', hex: '#add8e6' },
]
    .map(color => new Color(color));

const categories = [
    { name: 'Tops', gender: 'Both' },
    { name: 'Pants', gender: 'Both' },
    { name: 'Outerwear', gender: 'Both' },
    { name: 'Shoes', gender: 'Both' },
    { name: 'Accessories', gender: 'Both' },
    { name: 'Dresses', gender: 'Women' },
]
    .map(category => new Category(category));

const styles = [
    { name: 'Shirts', category: categories[0] },
    { name: 'Hoodies', category: categories[0] },

    { name: 'Trousers', category: categories[1] },
    { name: 'Jeans', category: categories[1] },
    { name: 'Sweatpants', category: categories[1] },

    { name: 'Coats', category: categories[2] },
    { name: 'Trucker jackets', category: categories[2] },

    { name: 'Sneakers', category: categories[3] },
    { name: 'Sandals', category: categories[3] },

    { name: 'Hats', category: categories[4] },
    { name: 'Socks', category: categories[4] },
]
    .map(style => new Style(style));

const products = [
    {
        name: 'Cotton shirt',
        category: categories[0],
        style: [styles[0]],
        price: 30,
        description: 'Plain cotton shirt, classic design, regular fit.',
        fabric: [{ type: fabrics[0], percentage: 100 }],
    },
    {
        name: 'Hoodie',
        category: categories[0],
        style: [styles[1]],
        price: 25,
        description: 'Warm and comfy. Plain design.',
        fabric: [{ type: fabrics[0], percentage: 100 }],
    },
    {
        name: 'Skinny jeans',
        category: categories[1],
        style: [styles[3]],
        price: 35,
        description: 'Sleek and stretchy, 5 pockets.',
        fabric: [{ type: fabrics[0], percentage: 100 }],
    },
    {
        name: 'Wool trousers',
        category: categories[1],
        style: [styles[2]],
        price: 50,
        description: 'Smart, classic and warm.',
        fabric: [{ type: fabrics[4], percentage: 100 }],
    },
    {
        name: 'Side stripe sweatpants',
        category: categories[1],
        style: [styles[4]],
        price: 30,
        description: 'Comfortable and stylish.',
        fabric: [{ type: fabrics[0], percentage: 100 }],
    },
    {
        name: 'Wool blend coat',
        category: categories[2],
        style: [styles[4]],
        price: 60,
        description: 'Classic coat, very warm, perfect for cold winter days.',
        fabric: [{ type: fabrics[4], percentage: 44 }, { type: fabrics[2], percentage: 66 }],
    },
    {
        name: 'Denim jacket',
        category: categories[2],
        style: [styles[5]],
        price: 35,
        description: 'Classic denim jacket.',
        fabric: [{ type: fabrics[0], percentage: 100 }],
    },
    {
        name: 'Running shoes',
        category: categories[3],
        style: [styles[6]],
        price: 40,
        description: 'Comfortable sneakers with a foam sole and mesh upper.',
        fabric: [{ type: fabrics[2], percentage: 100 }],
    },
    {
        name: 'Sandals',
        category: categories[3],
        style: [styles[7]],
        price: 40,
        description: 'Comfortable leather sandals perfect for summer sightseeing.',
        fabric: [{ type: fabrics[1], percentage: 80 }, { type: fabrics[2], percentage: 20 }],
    },
    {
        name: 'Baseball cap',
        category: categories[4],
        style: [styles[8]],
        price: 15,
        description: 'Classic baseball cap.',
        fabric: [{ type: fabrics[0], percentage: 80 }, { type: fabrics[2], percentage: 20 }],
    },
    {
        name: 'Long socks',
        category: categories[4],
        style: [styles[9]],
        price: 10,
        description: 'Comfy and stretchy.',
        fabric: [{ type: fabrics[0], percentage: 100 }],
    },
    {
        name: 'Sundress',
        category: categories[5],
        price: 30,
        description: 'Lightweight fabric, perfect for summer.',
        fabric: [{ type: fabrics[5], percentage: 100 }],
    },
]
    .map(product => new Product(product));

const models = [
    {
        product: products[0],
        color: colors[3],
        gender: 'Unisex',
        sizes: ['XXL', 'XL', 'L', 'M', 'S', 'XXS'],
    },
    {
        product: products[1],
        color: colors[3],
        gender: 'Unisex',
        sizes: ['XXL', 'XL', 'L', 'M', 'S', 'XXS'],
    },
    {
        product: products[2],
        color: colors[3],
        gender: 'Men',
        sizes: ['32', '31', '30', '29', '28'],
    },
    {
        product: products[2],
        color: colors[5],
        gender: 'Women',
        sizes: ['32', '31', '30', '29', '28'],
    },
    {
        product: products[3],
        color: colors[2],
        gender: 'Men',
        sizes: ['42', '41'],
    },
    {
        product: products[4],
        color: colors[2],
        gender: 'Women',
        sizes: ['L', 'M', 'S'],
    },
    {
        product: products[5],
        color: colors[2],
        gender: 'Men',
        sizes: ['46', '45', '44'],
    },
    {
        product: products[6],
        color: colors[5],
        gender: 'Women',
        sizes: ['L', 'M', 'S'],
    },
    {
        product: products[7],
        color: colors[5],
        gender: 'Men',
        sizes: ['46', '45', '44', '43', '42', '41', '40'],
    },
    {
        product: products[8],
        color: colors[1],
        gender: 'Women',
        sizes: ['39', '38', '37', '36'],
    },
    {
        product: products[9],
        color: colors[1],
        gender: 'Unisex',
        sizes: ['One size'],
    },
    {
        product: products[10],
        color: colors[1],
        gender: 'Unisex',
        sizes: ['46 - 43', '45 - 42', '41 - 39', '39 - 36'],
    },
    {
        product: products[11],
        color: colors[3],
        gender: 'Women',
        sizes: ['42', '41'],
    },
]
    .map(model => new Model(model));

const instances = [
    {
        model: models[0],
        size: 0,
        available: true,
    },
    {
        model: models[1],
        size: 0,
        available: true,
    },
    {
        model: models[2],
        size: 0,
        available: true,
    },
    {
        model: models[3],
        size: 0,
        available: true,
    },
    {
        model: models[4],
        size: 0,
        available: true,
    },
    {
        model: models[5],
        size: 0,
        available: true,
    },
    {
        model: models[6],
        size: 0,
        available: true,
    },
    {
        model: models[7],
        size: 0,
        available: true,
    },
    {
        model: models[8],
        size: 0,
        available: true,
    },
    {
        model: models[9],
        size: 0,
        available: true,
    },
    {
        model: models[10],
        size: 0,
        available: true,
    },
    {
        model: models[11],
        size: 0,
        available: true,
    },
    {
        model: models[12],
        size: 0,
        available: true,
    },
]
    .map(instance => new Instance(instance));

async function saveToDb() {
    await Promise.all([
        ...fabrics.map(instance => instance.save()),
        ...colors.map(color => color.save()),
        ...categories.map(category => category.save()),
    ]);

    await Promise.all(
        styles.map(style => style.save())
    );

    await Promise.all(
        products.map(product => product.save())
    );

    await Promise.all(
        models.map(model => model.save())
    );

    await Promise.all(
        instances.map(instance => instance.save())
    );
    
    mongoose.connection.close();
}

saveToDb();