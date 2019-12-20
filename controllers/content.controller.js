const mongoose = require('mongoose')
const User = require('../models/user.model')
const Content = require('../models/content.models')
const Comment = require('../models/comment.models')
const Like =  require('../models/likes.model')


module.exports.index = (req, res, next) => {
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

module.exports.show = (req, res, next) => {
    Content.findOne({ id: req.params.id })
    .populate('user')
    .populate('likes')
    .populate({
        path: 'comments',
        options: {
            sort: {
                createAt: 1
            }
        }
    })
    .then(content => {
        if(content) {
            console.log(content)
            res.render('content/show', { content, user: content.user })
        } else {
            req.session.genericError = 'Contenido no encontrado'
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

module.exports.like = (req, res, next) => {
    const params = { content: req.params.id, user: req.currentUser._id}

    Like.findOne(params)
        .then(like => {
            if(like) {
                Like.findByIdAndRemove(like._id)
                .then(() => {
                    res.json({ likes: -1 })
                })
                .catch(next)
            } else {
                
                const like = new Like(params)   

                like.save()
                    .then(() => {
                        res.json({ likes: 1 })
                    })
                    .catch(next)
            }
        })
        .catch(next)
}
