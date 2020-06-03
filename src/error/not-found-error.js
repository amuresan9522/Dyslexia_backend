import { HttpError } from './http-error';

export class NotFoundError extends HttpError {
    constructor(message) {
        super(404, message);
    }
}
