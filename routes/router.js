const { Router } = require('express');
const router = Router();

const homePage = require('../controllers/home');
const colorList = require('../controllers/color/colorList');
const fabricList = require('../controllers/fabric/fabricList');
const categoryList = require('../controllers/category/categoryList');
// const styleList = require('../controllers/style/styleList');
const productList = require('../controllers/product/productList');
// const modelList = require('../controllers/model/modelList');
const instanceList = require('../controllers/instance/instanceList');

const colorCreateGet = require('../controllers/color/colorCreateGet');
const styleCreateGet = require('../controllers/style/styleCreateGet');
const fabricCreateGet = require('../controllers/fabric/fabricCreateGet');
const categoryCreateGet = require('../controllers/category/categoryCreateGet');
const productCreateGet = require('../controllers/product/productCreateGet');
const modelCreateGet = require('../controllers/model/modelCreateGet');
const instanceCreateGet = require('../controllers/instance/instanceCreateGet');

const colorCreatePost = require('../controllers/color/colorCreatePost');
const styleCreatePost = require('../controllers/style/styleCreatePost');
const fabricCreatePost = require('../controllers/fabric/fabricCreatePost');
const categoryCreatePost = require('../controllers/category/categoryCreatePost');
const productCreatePost = require('../controllers/product/productCreatePost');
const modelCreatePost = require('../controllers/model/modelCreatePost');
const instanceCreatePost = require('../controllers/instance/instanceCreatePost');

const colorUpdateGet = require('../controllers/color/colorUpdateGet');
const styleUpdateGet = require('../controllers/style/styleUpdateGet');
const fabricUpdateGet = require('../controllers/fabric/fabricUpdateGet');
const categoryUpdateGet = require('../controllers/category/categoryUpdateGet');
const productUpdateGet = require('../controllers/product/productUpdateGet');
const modelUpdateGet = require('../controllers/model/modelUpdateGet');
const instanceUpdateGet = require('../controllers/instance/instanceUpdateGet');

const colorUpdatePost = require('../controllers/color/colorUpdatePost');
const styleUpdatePost = require('../controllers/style/styleUpdatePost');
const fabricUpdatePost = require('../controllers/fabric/fabricUpdatePost');
const categoryUpdatePost = require('../controllers/category/categoryUpdatePost');
const productUpdatePost = require('../controllers/product/productUpdatePost');
const modelUpdatePost = require('../controllers/model/modelUpdatePost');
const instanceUpdatePost = require('../controllers/instance/instanceUpdatePost');

const colorDeletePost = require('../controllers/color/colorDeletePost');
const styleDeletePost = require('../controllers/style/styleDeletePost');
const fabricDeletePost = require('../controllers/fabric/fabricDeletePost');
const categoryDeletePost = require('../controllers/category/categoryDeletePost');
const productDeletePost = require('../controllers/product/productDeletePost');
const modelDeletePost = require('../controllers/model/modelDeletePost');
const instanceDeletePost = require('../controllers/instance/instanceDeletePost');

const colorDetail = require('../controllers/color/colorDetail');
const styleDetail = require('../controllers/style/styleDetail');
const fabricDetail = require('../controllers/fabric/fabricDetail');
const categoryDetail = require('../controllers/category/categoryDetail');
const productDetail = require('../controllers/product/productDetail');
const modelDetail = require('../controllers/model/modelDetail');
const instanceDetail = require('../controllers/instance/instanceDetail');


router.get('/', homePage);


// LIST

router.get('/colors', colorList);
router.get('/fabrics', fabricList);
router.get('/categories-and-styles', categoryList);
// router.get('/styles', styleList);
router.get('/products-and-models', productList);
// router.get('/models', modelList);
router.get('/instances', instanceList);


// CREATE

router.get('/colors/new', colorCreateGet);
router.get('/fabrics/new', fabricCreateGet);
router.get('/categories/new', categoryCreateGet);
router.get('/styles/new', styleCreateGet);
router.get('/products/new', productCreateGet);
router.get('/models/new', modelCreateGet);
router.get('/instances/new', instanceCreateGet);

router.post('/colors/new', colorCreatePost);
router.post('/fabrics/new', fabricCreatePost);
router.post('/categories/new', categoryCreatePost);
router.post('/styles/new', styleCreatePost);
router.post('/products/new', productCreatePost);
router.post('/models/new', modelCreatePost);
router.post('/instances/new', instanceCreatePost);


// UPDATE

router.get('/colors/:id/update', colorUpdateGet);
router.get('/fabrics/:id/update', fabricUpdateGet);
router.get('/categories/:id/update', categoryUpdateGet);
router.get('/styles/:id/update', styleUpdateGet);
router.get('/products/:id/update', productUpdateGet);
router.get('/models/:id/update', modelUpdateGet);
router.get('/instances/:id/update', instanceUpdateGet);

router.post('/colors/:id/update', colorUpdatePost);
router.post('/fabrics/:id/update', fabricUpdatePost);
router.post('/categories/:id/update', categoryUpdatePost);
router.post('/styles/:id/update', styleUpdatePost);
router.post('/products/:id/update', productUpdatePost);
router.post('/models/:id/update', modelUpdatePost);
router.post('/instances/:id/update', instanceUpdatePost);


// DELETE

router.post('/colors/:id/delete', colorDeletePost);
router.post('/fabrics/:id/delete', fabricDeletePost);
router.post('/categories/:id/delete', categoryDeletePost);
router.post('/styles/:id/delete', styleDeletePost);
router.post('/products/:id/delete', productDeletePost);
router.post('/models/:id/delete', modelDeletePost);
router.post('/instances/:id/delete', instanceDeletePost);


// DETAIL

router.get('/colors/:id', colorDetail);
router.get('/fabrics/:id', fabricDetail);
router.get('/categories/:id', categoryDetail);
router.get('/styles/:id', styleDetail);
router.get('/products/:id', productDetail);
router.get('/models/:id', modelDetail);
router.get('/instances/:id', instanceDetail);

module.exports = router;