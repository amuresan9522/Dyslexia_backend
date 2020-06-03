import mongoose from 'mongoose';

const Schema   = mongoose.Schema;

const UserGameActivitySchema = new Schema({
    start: {
        type: String
    },
    end: {
        type: String
    },
    words: {
        type: mongoose.SchemaTypes.Mixed
    },
    userInput: {
        type: mongoose.SchemaTypes.Mixed
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

const UserGameActivity = mongoose.model('UserGameActivity', UserGameActivitySchema);

export default UserGameActivity;
