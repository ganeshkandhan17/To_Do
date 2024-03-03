let mongoose = require('mongoose');
url = "mongodb://127.0.0.1:27017/ToDo"
async function connectdb() {
    mongoose.connect(url)
        .then(console.log("Connected To Database"))
        .catch((err) => { console.log("Error Ocurs in Database Connection : " + err) })
}
module.exports = connectdb