const fs = require('fs/promises');

async function createDirectories() {
    const dirs = ['fabric', 'style', 'product', 'category', 'color', 'model', 'instance']

    await Promise.all(
        dirs.map(dir => fs.mkdir(`controllers/${dir}`))
    );

    await Promise.all([
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}List.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-list', { title: 'All ${item}s' });
};`        
        )),
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}CreateGet.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-form', { title: 'Add new ${item}' });
};` 
        )),
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}CreatePost.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-form', { title: 'Add new ${item}' });
};` 
        )),
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}UpdateGet.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-form', { title: 'Update ${item}' });
};` 
        )),
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}UpdatePost.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-form', { title: 'Update ${item}' });
};` 
        )),
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}DeletePost.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-detail', { title: 'Delete ${item}' });
};`         
        )),
        ...dirs.map(item => fs.writeFile(`controllers/${item}/${item}Detail.js`,
`module.exports = function (req, res, next) {
    res.render('${item}/${item}-detail', { title: '${item} details' });
};`         
        )),
    ]);

    console.log('done');
}

createDirectories();