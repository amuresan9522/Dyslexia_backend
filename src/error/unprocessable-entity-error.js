import { HttpError } from './http-error';

export class UnprocessableEntity extends HttpError {
    constructor(message) {
        super(422, message);
    }
}
