import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword)
        .then((result) => {
            if (result) return true;
            return Promise.reject(new Error(`The passwords don't match.`));
        });
};
