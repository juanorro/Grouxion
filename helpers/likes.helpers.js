module.exports = (hbs) => {
    hbs.registerHelper('isLike', (content, comment, user, options) => {
        const likeBool = user.like.some(userLike => userLike.id === likes.id);
            return likeBool ? new hbs.SafeString(option.fn(this)) : new hbs.SafeString(options.inverse(this));
    })

    hbs.registerHelper('isFollow', (user, options) => {
        const likeBool = user.follow.some(userFollow => userFollow.id === follow.id);
            return likeBool ? new hbs.SafeString(option.fn(this)) : new hbs.SafeString(options.inverse(this));
    })
}