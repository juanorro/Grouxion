const User = require('../models/user.model');
const createError = require('http-error');
const mongoose = require('mongoose');
const categories = require('../data/categories')

// module.exports.listByCategory = (req, res) => {
//   const category = req.params.category

//   User.find({ artist: true })
//     .then(artists => {
//       artists.find({ categories: category})
//         .then(artistsByCategory => {
//           res.render('users/artist/list', artistsByCategory )
//         })
//         .catch(err => {
//           res.render()
//         })
//     })
//     console.log('entra')
//     res.send(`aqui iran artistas de la categoría: ${category}`)
//   } 

  module.exports.listByCategory = (req, res) => {
  const category = req.params.category

  User.find({ artist: true, categories: category }) // Artistas y que se clasifican por category. De donde sale category? categories sí.
    .then(artistsByCategory => {
      res.render('artists/list', { artists: artistsByCategory, categories } )
    })
    .catch(err => {
      next(err)
    })
  } 


