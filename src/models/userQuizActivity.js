import mongoose from 'mongoose';

const Schema   = mongoose.Schema;

const UserQuizActivitySchema = new Schema({
    points: {
        type: String
    },
    resources: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true,
    versionKey: false,
    toObject: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;

        }
    }
});

const UserQuizActivity = mongoose.model('UserQuizActivity', UserQuizActivitySchema);

export default UserQuizActivity;
