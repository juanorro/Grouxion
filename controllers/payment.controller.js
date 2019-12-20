const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.donate = (req, res, next) => {
    stripe.charges.create({
        amount: req.body.amount * 100,
        description: 'donation',
        currency: 'EUR',
        source: req.body.id,
        receipt_email: req.body.email
    })
    .then(charge => {
        res.json({OK: true}) //renderizar a vista comentando q todo va bien. POdemos buscar el artista por ID y ponerle un unpdate diciendo lo que le han ido donando
    })
    .catch(next)
}