const User = require('../models/user.model');

module.exports.listByCategory = (req, res) => {
  const category = req.params.category

  User.find({ artist: true })
    .then(artists => {
      artists.find({ categories: category})
        .then(artistsByCategory => {
          res.render('users/artist/list', artistsByCategory )
        })
        .catch(err => {
          res.render()
        })
    })
    console.log('entra')
    res.send(`aqui iran artistas de la categoría: ${category}`)
  } 

