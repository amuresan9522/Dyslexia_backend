import { InternalServerError, HttpError } from '../error';

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof HttpError) {
        if (err instanceof InternalServerError) {
            console.log(err.error);
            if (err.error && err.error.name) {
                if (err.error.name === 'MulterError') return res.status(422).json({ error: err.error });
                next();
            }
        }
        return res.status(err.code).json(err.serialize());
    }
    return errorHandler(new InternalServerError('Internal server error.', err), req, res, next);
};
