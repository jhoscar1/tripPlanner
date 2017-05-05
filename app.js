const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();
const models = require('./models');
const db = models.db;
const router = require('./routes');


// Template Boilerplate
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

// Our middleware tools
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/', router);

app.use(function(err, req, res, next) {
    res.send(err.message);
});

db.sync(/*{force: true}*/)
.then(() => {
    app.listen(3000, function() {
        console.log("I'm waiting...");
    })
});