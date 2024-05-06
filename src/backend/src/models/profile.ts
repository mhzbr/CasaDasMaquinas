import mongoose from "mongoose";

interface ProfileAttrs
{
    cpf: string;
    about?: string;
    stars?: number;
    footLength?: number;
    birthDate?: Date;
    sexuality?: string;
    genre?: string;
    height?: number;
    weight?: number;
    region?: string;
    startTime?: Date;
    endTime?: Date;
    local?: string;
    description?: string;
    verifiedProfile?: boolean;
    valuePerHour?: number;
    videoPath?: string;
    photoPath?: string;
}

interface ProfileModel extends mongoose.Model<ProfileDoc>
{
    build(attrs: ProfileAttrs): ProfileDoc;
}

export interface ProfileDoc extends mongoose.Document
{
    cpf: string;
    about?: string;
    stars?: number;
    footLength?: number;
    birthDate?: Date;
    sexuality?: string;
    genre?: string;
    height?: number;
    weight?: number;
    region?: string;
    startTime?: Date;
    endTime?: Date;
    local?: string;
    description?: string;
    verifiedProfile?: boolean;
    valuePerHour?: number;
    videoPath?: string;
    photoPath?: string;
    age: number | undefined;
    isWorking: boolean;
}

export const profileSchema = new mongoose.Schema({
        cpf: {
            type: String,
            required: true
        },
        about: String,
        stars: Number,
        footLength: Number,
        birthDate: mongoose.Schema.Types.Date,
        sexuality: String,
        genre: String,
        height: Number,
        weight: Number,
        region: String,
        startTime: mongoose.Schema.Types.Date,
        endTime: mongoose.Schema.Types.Date,
        local: String,
        description: String,
        verifiedProfile: Boolean,
        valuePerHour: Number,
        videoPath: String,
        photoPath: String
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true,
            transform(doc, ret)
            {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    });

profileSchema.virtual("age").get(function (this: any)
{
    if (this.birthDate)
    {
        const birthDate = new Date(this.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
        {
            return age - 1;
        }
        else
        {
            return age;
        }
    }

    return undefined;
});

profileSchema.virtual("isWorking").get(function (this: any)
{
    if (this.startTime && this.endTime)
    {
        const currentTime = new Date();
        const startTime = new Date(this.startTime);
        const endTime = new Date(this.endTime);

        // Check if endTime is on another day
        if (endTime.getTime() < startTime.getTime())
        {
            // If endTime is on another day, check if currentTime is between startTime and the next day's endTime
            return (
                (currentTime >= startTime || currentTime <= endTime) ||
                (currentTime.getHours() < endTime.getHours() ||
                    (currentTime.getHours() === endTime.getHours() && currentTime.getMinutes() <= endTime.getMinutes()))
            );
        }
        else
        {
            // If endTime is on the same day, check if currentTime is between startTime and endTime
            return (
                (currentTime >= startTime && currentTime <= endTime) ||
                (currentTime.getHours() === endTime.getHours() && currentTime.getMinutes() <= endTime.getMinutes())
            );
        }
    }

    return false;
});

profileSchema.statics.build = (attrs: ProfileAttrs) =>
{
    return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>("Profile", profileSchema);

export {Profile};
