import multer, {FileFilterCallback} from "multer";
import {Express, Request} from "express";
import {v4 as uuidv4} from "uuid";
import {BadRequestError} from "@sgtickers-course/common";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads/"); // Destination folder for uploaded files
    },
    filename: (req, file, cb) =>
    {
        cb(null, Date.now() + "-" + uuidv4() + "." + file.originalname.split(".").pop()); // Unique filename
    }
});

// File filter function for videos and images
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) =>
{
    const videoMimeTypes = ["video/mp4", "video/mpeg", "video/x-msvideo", "video/x-ms-wmv"];
    const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file.fieldname === "video" && videoMimeTypes.includes(file.mimetype))
    {
        cb(null, true); // Accept the file
    }
    else if (file.fieldname === "photo" && imageMimeTypes.includes(file.mimetype))
    {
        cb(null, true); // Accept the file
    }
    else
    {
        const allowedFormats = file.fieldname === "video" ? "MP4, MPEG, AVI, or WMV" : "JPEG, PNG, or GIF";
        cb(new BadRequestError(`Formato deve ser ${allowedFormats}`));
    }
};

// Multer configuration for file uploads
const fileUpload = multer({
    storage,
    fileFilter: fileFilter
});

export {fileUpload as upload};