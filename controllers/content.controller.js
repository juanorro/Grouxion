const mongoose = require('mongoose')
const User = require('../models/user.model')
const Content = require('../models/content.models')
const Comment = require('../models/comment.models')


module.exports.index = (re, res, next) => {
    const criteria = req.query.search
    ? {
      body: new RegExp(req.query.search, "i")
    }
    : {}

    Content.find(criteria)
        .limit(10)
        .sort({createdAt: 1})
        .populate('user')
        .then(contents => {
            res.render('partials/profileSecond', { user: req.currentUser, contents })    
        })
        .catch(next)
}

module.exports.addComment = (req, res, next) => {
    const contentId = req.params.id


    const comment = new Comment({
        text: req.body.text,
        user: req.currentUser.id,
        content: contentId,
    })

    comment.save()
        .then(c => {
            req.session.genericSuccess = "comentario creado"
            res.redirect(`users/content/${contentId}`)
        })
        .catch(() => {
            req.session.genericError = 'Error creando el comentario'
            res.redirect(`users/content/${contentId}`)
        })
}

module.exports.show = (req, res, next) => {
    Content.findOne({ id: req.params.id })
    .populate('user')
    .populate({
        path: 'comments',
        options: {
            sort: {
                createAt: 1
            }
        },
        populate: {
            path: 'user'
        }
    })
    .then(content => {
        if(content) {
            res.render('content/show', { content, user: content.user })
        } else {
            req.session.genericError = 'Contenido cno encontrado'
            res.redirect(`/users/${user.id}`)
        }
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
    const userId = req.params.id
    
    const content = new Content({
        body: req.body.body,
        image: req.body.image,
        user: userId      
    })
    
    content.save()
        .then(() => {
            res.redirect(`/users/${userId}`)
        })
        .catch(next)
}

