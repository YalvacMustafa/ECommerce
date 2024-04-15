const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({

    name : {

        type : String,
        required : [true, "Lütfen İsminizi Giriniz: "],
    }, 

    surname : {

        type : String,
        required : [true, "Lütfen Soyisminizi Giriniz: "],
    },

    email : {

        type : String,
        required : [true, "Lütfen Geçerli Bir Email Giriniz."],
        unique : true,
        match : emailRegex,
    },

    password : {

        type : String,
        minlength : 8,
        required : [true, "Lütfen Bir Parola Giriniz."],
        select : false,
    },    
}, 

{timestamps : true

});
UserSchema.methods.JWTGenerateFromUser = function() {

    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {

        id : this._id,
        name : this.name
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {

        expiresIn : JWT_EXPIRE
    });
    return token;
};

UserSchema.pre("save", async function (next){

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
})

UserSchema.pre("validate", function (next) {

    const self = this;
    this.constructor.findOne({ email : self.email })
        .then(user => {

            if (user) {

                const err = new Error("Bu email daha önce kullanılmış.Lütfen başka bir email deneyiniz.");
                return next(err);
            }
            next();
        })
        .catch(err =>  next(err));
});

module.exports = mongoose.model("User", UserSchema);