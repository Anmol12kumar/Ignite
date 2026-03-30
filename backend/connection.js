const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.MONGO_URL;

mongoose.connect(url)

    .then(() => {
        console.log('Connected to MongoDB...!!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB...!!',error);
    });

module.exports = mongoose;