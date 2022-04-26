const express = require('express');

const urlsRouter = require('./urls.router');
//const usersRouter = require('./users.router');
//const categoriesRouter = require('./categories.router');


function routerApi_v1(app) {
    const router = express.Router();
    app.use('/v1', router);
    router.use('/urls', urlsRouter);
    //router.use('/users', usersRouter);
    //router.use('/categories', categoriesRouter);
}

module.exports = routerApi_v1;