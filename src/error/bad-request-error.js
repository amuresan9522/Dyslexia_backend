import { HttpError } from './http-error';

export class BadRequestError extends HttpError {
    constructor(fields) {
        super(400, `Validation errors occured.`);
        this.fields = fields;
    }

    serialize() {
        return {
            ...super.serialize(),
            fields: this.fields
        };
    }
}
