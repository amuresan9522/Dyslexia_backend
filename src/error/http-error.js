export class HttpError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }

    serialize() {
        return {
            code: this.code,
            message: this.message
        };
    }
}
