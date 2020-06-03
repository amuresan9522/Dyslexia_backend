import UserQuizActivity from '../models/userQuizActivity';
import { NotFoundError } from '../error';

export const getUserActivities = (userId) => {
    return UserQuizActivity.find({ userId })
    .then((activities) => {
        if (activities.length <1 ) return null;

        const result = activities.map((activity) => activity.toObject())
        return result;
    })
}

export const create = (userId, resources, points) => {
    const userActivity = new UserQuizActivity({
        userId,
        resources,
        points
    });
    
    return userActivity
        .save()
        .catch((err) => Promise.reject(new InternalServerError(err)))
}