import { verifyAuthToken } from '../services/token.service';

import { UnauthorizedError } from '../error';

export function authorizedOnly(request, response, next) {
    const error = () => next(new UnauthorizedError(`Invalid credentials.`));
    const token = request.header('Authorization');

    if (!token) return error();
    return verifyAuthToken(token)
        .then((result) => {
            request.userId = result.id;
            return next();
        })
        .catch((error) => {
            return error
        });
}
