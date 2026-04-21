const mongoose = require('mongoose');
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const url = process.env.MONGO_URL || 'mongodb+srv://guptaanmolkumar37:anmol37kumar@cluster0.uznew9m.mongodb.net/ignite?appName=Cluster0'

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;