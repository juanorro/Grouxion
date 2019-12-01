const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:2707/grouxion';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.info(`Sucessfully connected to the database ${MONGO_URI}`))
    .catch(error => console.error(`An error ocurred trying to connect to the database ${MONGO_URI}`, error));