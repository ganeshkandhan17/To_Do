require("dotenv").config();
let mongoose = require("mongoose");
const uri =process.env.dburl;
async function connectdb() {
  mongoose
    .connect(uri)
    .then(console.log("Connected To Database"))
    .catch((err) => {
      console.log("Error Ocurs in Database Connection : " + err);
    });
}
module.exports = connectdb;
