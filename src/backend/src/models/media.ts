import mongoose from "mongoose";
import {MediaType} from "./enums/media-type";

interface MediaAttrs
{
    url: string;
    type: MediaType;
}

interface MediaModel extends mongoose.Model<MediaDoc>
{
    build(attrs: MediaAttrs): MediaDoc;
}

export interface MediaDoc extends mongoose.Document
{
    url: string;
    type: MediaType;
}

export const mediaSchema = new mongoose.Schema({
    url: String,
    type: {
        type: String,
        enum: Object.values(MediaType)
    }
}, {
    toJSON: {
        transform(doc, ret)
        {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
        }
    }
});

mediaSchema.statics.build = (attrs: MediaAttrs) =>
{
    return new Media(attrs);
};

const Media = mongoose.model<MediaDoc, MediaModel>("Media", mediaSchema);

export {Media};