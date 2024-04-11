const User = require("../Models/user");
const {sendJwtToClient} = require("../complement/authorization/Token");
const {validateUserInput, comparePassword} = require("../complement/input/input");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async(req, res, next) => {

    const {name, surname, email, password} = req.body;

    const user = await User.create({

        name,
        surname,
        email,
        password
    });
    sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {

    const {email, password } = req.body;
    if (!validateUserInput(email, password)) {
        return next (new Error("Lütfen bilgilerinizi tekrar kontrol ediniz.", 401));
    }

    const user = await User.findOne({email}).select("password");
    if (!comparePassword(password, user.password)) {

        return next (new Error("Lütfen bilgilerinizi tekrar kontrol ediniz.", 401));
    }
    sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async(req, res, next) => {
    const {NODE_ENV} = process.env;
    return res.status(200).cookie({

        httpOnly : true,
        expires : new Date(Date.now()),
        secure : NODE_ENV === "development" ? false : true,
    })
    .json({

        success : true,
        message : "Başarıyla Çıkış Yapılmıştır."
    });
});

module.exports = {register, login, logout};