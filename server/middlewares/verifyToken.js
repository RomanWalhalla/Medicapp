import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET;
// const refreshSecret = process.env.JWT_REFRESH_SECRET

async function verifyToken(req, res, next) {
    const accessToken = req.headers['authorization'];

    // const token = authHeader && authHeader.split(" ")[1]
    if (!accessToken)
        return res.status(403).json({ success: false, message: 'Don`t have accessToken, Authorization failed - verifyToken' });
    try {
        const decoded = jwt.verify(accessToken, accessSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        // console.log(error);  
        // if (error.name === "TokenExpiredError") {

        //     const refreshToken = req.body.refreshToken
        //     if (!refreshToken) {
        //         return res.status(403).json({ success: false, message: "Refresh token not provided" });
        //     }
        //     try {
        //         const decoded = jwt.verify(refreshToken, refreshSecret)
        //         const newAccessToken = jwt.sign({ userId: decoded.userId }, accessSecret, { expiresIn: "1h" })

        //         req.accessToken = newAccessToken
        //         req.userId = decoded.userId
        //         next()
        //     } catch (error) {
        //         return res.status(403).json({ success: false, message: "Invalid refresh token" });
        //     }
        // } else {
        //     return res.status(400).json({ success: false, message: "Invalid access token" });
        // }
    }
}

export default verifyToken;