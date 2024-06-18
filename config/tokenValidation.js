import "dotenv/config";
import jwt from "jsonwebtoken";

export const tokenValidation = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Acceso denegado");
    
    try {
        const payload = jwt.verify(token, process.env.SK);
        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(400).json("Token no es válido");
    }
    }