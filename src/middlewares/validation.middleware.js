import joi from 'joi';
import _ from 'lodash';

import { BadRequestError } from '../error';

const getKeyFromPath = (path) => {
    return _.reduce(path, (builtKey, key) => {
        if (typeof key === 'string') {
            return `${builtKey}.${key}`;
        }

        return `${builtKey}[${key}]`;
    });
};

export const validateSchema = (schema, type = 'body') => (request, response, next) => {

    return joi.validate(request[type], schema, { abortEarly: false })
        .then((value) => {
            request[type] = value;
            return next();
        })
        .catch((error) => {
            console.log('error = ', error)
            const fields = _.reduce(error.details, (fields, error) => {
                const key = getKeyFromPath(error.path);
                fields[key] = error.message.replace(new RegExp(`"${error.context.key}" `), '');
                return fields;
            }, {});

            return next(new BadRequestError(fields));
        });
};

export const validateBodySchema = (schema) => validateSchema(schema, 'body');

