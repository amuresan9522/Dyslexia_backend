import User from '../models/user';

import { createAuthToken } from '../services/token.service';
import { comparePassword } from '../services/hash.service';
import { hashPassword } from '../services/hash.service';

import { ConflictError, NotFoundError, InternalServerError, UnauthorizedError } from '../error';

import {getUserActivities } from './userQuizActivity.repository';
import {getUserGameActivities } from './userGameActivity.repository';

export const findDuplicateUser = (email) => {
    return User.findOne({ email })
        .then((userFound) => {
            if (userFound === null) return userFound;
            return Promise.reject(new ConflictError('A user with this email already exists.'));
        });
};

export const findUserById = (id) => {
    return User.findById(id)
    .catch((err) => Promise.reject(new InternalServerError(err)))
    .then(async (user) => {
        if (!user) return Promise.reject(new NotFoundError('User not found.'));
        const userQuizActivity = await getUserActivities(id)
        const userGameActivity = await getUserGameActivities(id)
        
        return {...user.toObject(), userQuizActivity, userGameActivity};
    });
};

export const authenticateUser = (userEmail, userPassword) => {
    return User.findOne({ email: userEmail }).select('password')
        .catch((err) => Promise.reject(new InternalServerError(err)))
        .then((user) => {
            if (user === null) return Promise.reject(new UnauthorizedError('Email or password is incorrect.'));

            return comparePassword(userPassword, user.password)
                .catch(() => Promise.reject(new UnauthorizedError('Email or password is incorrect.')))
                .then(() => {
                    return createAuthToken(user.id)
                        .then((token) => {
                            return { accesToken: token };
                        });
                });
        });
};

export function registerUser(firstName, lastName, email, password) {
    return findDuplicateUser(email)
        .then(() => {
            return hashPassword(password)
                .then((password) => {
                        const user = new User({
                            firstName,
                            lastName,
                            email,
                            password
                        })

                        return user
                            .save()
                            .then((user) => user.toObject())
                });
        });
}

export function updateUser(id, firstName, lastName, email) {
    return findUserById(id)
        .then((user) => {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;

            return user.save()
                .catch((error) => {
                    return Promise.reject(new InternalServerError(error));
                });
        });
}