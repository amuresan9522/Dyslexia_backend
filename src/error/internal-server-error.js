import { HttpError } from './http-error';
export class InternalServerError extends HttpError {
    constructor(message, error) {
        super(500, message);
        this.error = error;
    }
}
