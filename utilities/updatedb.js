const Instance = require('../models/instance');

var userArgs = process.argv.slice(2);

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

Instance.find({}, function (err, docs) {
    const promises = docs.map(doc => {
        doc.available = true;
        return doc.save();
    });
    Promise.all(promises).then(() => mongoose.connection.close());
});