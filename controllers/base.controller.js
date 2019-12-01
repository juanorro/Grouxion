const createError = require('http-error');
const mongoose = require('mongoose');

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Grouxion: the best continuous crowfunding platform to Creators'
    });
};