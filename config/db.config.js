const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb://localhost:27017/grouxion';


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.info(`Sucessfully connected to the database GROUXION`))
    .catch(error => console.error(`An error ocurred trying to connect to the database GROUXION`, error));

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    });