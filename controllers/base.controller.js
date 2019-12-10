const createError = require('http-error');
const mongoose = require('mongoose');
const data = require('../data/categories')

module.exports.base = (req, res, next) => {

    res.render('index', {
        title: 'ArtCoolT: the best continuous crowfunding platform to Creators',
        categories: data
    });
};