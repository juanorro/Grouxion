const hbs = require('hbs');
const path = require('path');


hbs.registerPartials(path.join(__dirname, '../views/partials'));
hbs.registerPartials(path.join(__dirname, '../views/home'));
