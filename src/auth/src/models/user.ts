import mongoose from 'mongoose';
import {Password} from "../services/password";
import {Roles} from "./roles";

// Interface to work well with ts
interface UserAttrs
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cpf?: string;
    role: Roles;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc>
{
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cpf?: string;
    role: Roles;
}

const userSchema = new mongoose.Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: String,
    role: String
}, {
    toJSON: {
        transform(doc, ret)
        {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password; // Removing property from the doc
            delete ret.__v;
        }
    }
});

// Adding a function to a model.
userSchema.statics.build = (attrs: UserAttrs) =>
{
    return new User(attrs);
};

userSchema.pre('save', async function (done)
{
    if (this.isModified('password'))
    {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};