import mongoose from 'mongoose';

const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
},
{
    timestamps: true,
    versionKey: false,
    toObject: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;

        }
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
