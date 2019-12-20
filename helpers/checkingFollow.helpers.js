module.exports = (hbs) => {
    hbs.registerHelper('isFollow', (user, options) => {
        const likeBool = user.follow.some(userFollow => userFollow.id === follow.id);
            return likeBool ? new hbs.SafeString(option.fn(this)) : new hbs.SafeString(options.inverse(this));
    })
}

module.expor