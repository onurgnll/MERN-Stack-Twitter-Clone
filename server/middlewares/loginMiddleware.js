const jwt = require("jsonwebtoken");


const isLogged = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.json({
                success: false,
                message: "Token Bulunamadı"
            })
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            req.user = {
                _id: decodedToken._id,
                name: decodedToken.name,
                lastname: decodedToken.lastName,
                email: decodedToken.email,
                username: decodedToken.username

            };
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Giriş Yapmadınız"

        })


    }



}

module.exports = isLogged