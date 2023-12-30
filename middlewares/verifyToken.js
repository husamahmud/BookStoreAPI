const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
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

function authorizeTokenAndPermissions(req, res, next) {
    authenticateToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({message: "Access denied. You are not authorized to perform this action."});
        }
    });
}

function authorizeTokenAndAdmin(req, res, next) {
    authenticateToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({message: "Access denied. You are not authorized to perform this action."});
        }
    });
}

module.exports = {
    authorizeTokenAndPermissions,
    authorizeTokenAndAdmin
};
