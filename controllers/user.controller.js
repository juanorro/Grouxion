const User = require('../models/user.model');
const mongoose = require('mongoose');


////////// USER NEW //////////


module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
}


////////// USER CREATE //////////


module.exports.create = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    social: req.body.social,
    bio: req.body.bio,
    // profileimg: req.file.secure_url,
    // coverimg: req.file.secure_url,
    city: req.body.city,
    zp: req.body.zp,
    country: req.body.country,
    artist: req.body.artist,
    website: req.body.website,
    categories: req.body.categories,
    artist: req.body.usertype === 'artista' // Si en select es artist, entonces true
  })
  console.log(req.body)


////////// USER SAVE //////////


  user.save()
  .then((user) => {
    // mailer.sendValidateEmail(user)
    res.redirect('/login')
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render('users/new', { user, error: error.errors })
    } else if (error.code === 11000) {
      res.render('users/new', {
        user: {
          ...user,
          password: null
        },
        genericError: 'User exists'
      })
    } else {
      next(error);
    }
  })
}



////////// USER EDIT //////////



module.exports.edit = (req, res, next) => {
  const id = req.params.id

  User.findById(id)
    .then(user => {
      res.render('users/edit', {user})
    })
    .catch(error => {next (error)
    })
}



// module.exports.doEdit = (req, res, next) => {
//   const id = req.params.id

//   if(!mongoose.Types.ObjectId.isValid(id)) {
//     next(createError(404));
//   } else {
//   User.findByIdAndUpdate(id, req.body, { new: true })
//   .then(user => {
//     res.redirect(``)
//   }
//   })
// }

////////// USER VALIDATE - NOT WORKING //////////


module.exports.validate = (req, res, next) => {
    User.findOne({ validateToken: req.params.token })
      .then(user => {
        if (user) {
          user.validated = true
          user.save()
            .then(() => {
              res.redirect('/login')
            })
            .catch(next)
        } else {
          res.redirect('/')
        }
      })
      .catch(next)
  }


  ////////// USER LOGIN //////////



  module.exports.login = (_, res) => {
    res.render('users/login')
  }



  ////////// USER MY PROFILE //////////



  module.exports.myProfile = (req, res, next) => {
    const id = req.params.id;

    //comprobar que el id es igual que req.session.user.id
    //errores, estás modi


    User.findByIdAndUpdate(id, req.body, { new: true })
      .then(user => {
        if (!user) {
          req.session.genericError = 'El usuario no existe'
          res.render('users/new', req.body);
        } else {
            req.session.user = user;
            res.redirect(`/users/${user.id}`);
        }
      });
  }


//   module.exports.profile = (req, res, next) => {
//     User.findOne({ username: req.params.username })
//     .populate({
//         path: 'content',
//         populate : {
//             path: 'user'
//         }
//     })
//     .then(user => {
//         if (user) {
//             res.render(`/users/${user.id}`, {user, contents: user.content})
//         } else {
//     req.session.genericError = "usuario no encontrado"
//     res.redirect(`/users/${user.id}`)
// }
//     })
//     .catch(next)
// }



  ////////// USERS PROFILE ACCESS //////////



  module.exports.profile = (req, res, next) => {
    const id = req.params.id

    User.findById(id)
    .populate('contents')
      .then(user => res.render(`users/profile`, {user}))
      .catch(err => next(err))
  }



  ////////// USER DO LOGIN //////////




  module.exports.doLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
  
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          req.session.genericError = 'Wrong credentials'
          res.redirect('/login')
        }
        else {
          user.checkPassword(password)
            .then(match => {
              if (!match) {
                req.session.genericError = 'Wrong credentials'
                res.redirect('/login')
              } else {
                req.session.user = user
                res.redirect(`/users/${user.id}`)
              }
  
            })
            .catch(next)
        }
      })
      .catch(next)
  
  }


  ////////// USER LOGOUT //////////


  
  module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
