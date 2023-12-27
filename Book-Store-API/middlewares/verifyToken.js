const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (!token) return res.status(401).json({error: "No token found"});

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({error: "Token has expired"});
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({error: "Invalid token"});
        } else {
            console.error(error);
            return res.status(500).json({error: "Interval server error"});
        }
    }
}

module.exports = verifyToken;
