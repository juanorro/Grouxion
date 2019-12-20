module.exports = (hbs) => {
    hbs.registerHelper('isLike', (content, comment, user, options) => {
        const likeBool = user.like.some(userLike => userLike.id === likes.id);
            return likeBool ? new hbs.SafeString(option.fn(this)) : new hbs.SafeString(options.inverse(this));
    })

    hbs.registerHelper('isFollow', (user, options) => {
        const likeBool = user.follow.some(userFollow => userFollow.id === follow.id);
            return likeBool ? new hbs.SafeString(option.fn(this)) : new hbs.SafeString(options.inverse(this));
    })

    hbs.registerHelper('isSession', (id, user, options) => {
        const userId = id._id
        const currentId = user._id
        const userBool = userId == currentId 
        return !userBool ? new hbs.SafeString(options.fn(this)) : new hbs.SafeString(options.inverse(this));
    })
}

// hbs.registerHelper('isContent', (id, content, options) => {
//     const contentId = id.id
//     // const currentId = user._id
//     const contentrBool = contentId != undefined
//     return !userBool ? new hbs.SafeString(options.fn(this)) : new hbs.SafeString(options.inverse(this));
// })
// }

