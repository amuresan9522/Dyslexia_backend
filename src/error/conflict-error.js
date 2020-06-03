import { HttpError } from './http-error';

export class ConflictError extends HttpError {
    constructor(message) {
        super(409, message);
    }
}
