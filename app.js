const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const models = require('./models');
const db = models.db;
const router = require('./routes');
const app = express();

// Our middleware tools
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));

// Template Boilerplate
const env = nunjucks.configure('./views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/', router);

app.use(function(err, req, res, next) {
    res.send(err);
})

db.sync({force: true})
.then(() => {
    app.listen(3000, function() {
        console.log("I'm waiting...");
    })
});