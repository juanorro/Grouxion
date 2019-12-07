const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/grouxion';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.info(`Sucessfully connected to the database ${MONGO_URI}`))
    .catch(error => console.error(`An error ocurred trying to connect to the database ${MONGO_URI}`, error));

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    });