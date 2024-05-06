import mongoose from "mongoose";
import {Password} from "../services/password";
import {Role} from "./enums/role";
import {ProfileDoc, profileSchema} from "./profile";
import {MediaDoc, mediaSchema} from "./media";

interface UserAttrs
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile?: ProfileDoc;
    media?: MediaDoc[];
    isVerified: boolean;
    role: Role;
}

interface UserModel extends mongoose.Model<UserDoc>
{
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile: ProfileDoc;
    media: MediaDoc[];
    isVerified: boolean;
    role: Role;
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
    profile: {
        type: profileSchema
    },
    media: {
        type: [mediaSchema]
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Role),
        required: true
    }
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

userSchema.statics.build = (attrs: UserAttrs) =>
{
    return new User(attrs);
};

userSchema.pre("save", async function (done)
{
    if (this.isModified("password"))
    {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }

    done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export {User};