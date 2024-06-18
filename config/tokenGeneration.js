import jwt from 'jsonwebtoken';
import "dotenv/config";

export const tokenGeneration = (user) => {
    const payload = { user };
    return jwt.sign(payload, process.env.SK, { expiresIn: '1h' });
}