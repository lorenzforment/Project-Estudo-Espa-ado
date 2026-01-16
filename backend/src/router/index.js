const estudo = require('./estudo');

module.exports = app => {
    app.use('/api', estudo);
}