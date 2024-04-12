const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../complement/authorization/Token");

const getAccessToRoute = (req, res, next) => {

    const {JWT_SECRET_KEY} = process.env;

    if(!isTokenIncluded(req)) {
        return next(new Error("Erişim tokeni bulunamadı.", 401));
    };
    const accessToken  = getAccessTokenFromHeader(req);
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {

        if (err) {

            return next(new Error("Geçersiz erişim tokeni.", 401));
        } 
        req.user = {

            id : decoded.id,
            name : decoded.name
        }
        next();
    })
};

module.exports = {getAccessToRoute};