import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/app.config';

export function createAuthToken(id, role, audience) {
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, JWT_SECRET, (err, token) => {
            if (err) return reject(err);
            return resolve(token);
        });
    });
}

export function verifyAuthToken(token, audience) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });
}
