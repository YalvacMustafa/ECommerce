const mongoose = require("mongoose");

const connectdb = () =>{

    mongoose.connect(process.env.MONGO_URI)
    .then (() =>{

        console.log("Veritabanına Bağlantı Başarılı");
    })
    .catch(err => {

        console.log(err);
    })
}

module.exports = connectdb;