const mongoose = require('mongoose')
const Content = require('../models/content.models')
const Comment = require('../models/comment.models')
const User = require('../models/user.model')
const Like = require('../models/likes.model')

module.exports.create = (req, res, next) => {
    const userId = req.params.userId
    const contentId = req.params.id
    console.log(req.body)
    
    const comment = new Comment({
        message: req.body.message,
        image: req.body.image,
        user: userId,
        content: contentId
    })
    
    comment.save()
        .then(() => {
            res.redirect(`/users/${userId}`)
        })
        .catch(next)
}