const fs = require('fs/promises');

async function createDirectories() {
  const dirs = ['fabric', 'color', 'product', 'model', 'instance', 'category', 'style'];

  await Promise.all(
    dirs.map(dir => fs.mkdir(`views/${dir}`))
  );

  await Promise.all([
    ...dirs.map(item => fs.writeFile(`views/${item}/${item}-form.pug`,
`extends ../layout

block content
  h1= title`
    )),
  ]);

  console.log('done');
}

createDirectories();