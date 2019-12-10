const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');
//Handlebars and Mongoose config

require('./config/hbs.config');
require('./config/db.config');
const session = require('./config/session.config');

//Configure express

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  req.currentUser = req.session.user
  next()
})

// app.use(alertMiddleware)
// app.use(authMiddleware);

//View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Configure routes

const router = require('./config/routes.js');
app.use('/', router);

//Catch 404 and forward to error handler

app.use(function (err, req, res, next){
    res.locals.message = err.message; 
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error')
});

//Listen port

const port = normalizePort(process.env.PORT || '3001');
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Normalize a port

function normalizePort(val) {
    var port = parseInt(val, 10);
    if(isNaN(port)){
        return val
    }
    if (port >= 0){
        return port;
    }
    return false; 
}