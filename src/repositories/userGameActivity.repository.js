import UserGameActivity from '../models/userGameActivity';

export const getUserGameActivities = (userId) => {
    return UserGameActivity.find({ userId })
    .then((activities) => {
        if (activities.length <1 ) return null;

        const result = activities.map((activity) => activity.toObject())
        return result;
    })
}

export const create = (userId, start, end, words, userInput) => {
    const userGameActivity = new UserGameActivity({
        userId,
        start,
        end,
        words,
        userInput
    });
    
    return userGameActivity
        .save()
        .then((entity) => {
            return entity
        })
        .catch((err) =>  Promise.reject(new InternalServerError(err)))
       
}