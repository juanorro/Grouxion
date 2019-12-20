module.exports = (hbs) => {

    hbs.registerHelper('isSession', (id, user, options) => {
        const userId = id.id
        const currentId = user._id
        const userBool = userId == currentId 
        return !userBool ? new hbs.SafeString(options.fn(this)) : new hbs.SafeString(options.inverse(this));
    })
}