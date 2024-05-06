import {currentUser, NotFoundError, requireAuth} from "@sgtickers-course/common";
import {upload} from "../../services/multer-upload";
import {User} from "../../models/user";
import {Role} from "../../models/enums/role";
import express from "express";
import {MediaType} from "../../models/enums/media-type";
import {Media} from "../../models/media";

const router = express.Router();

router.post("/api/users/upload",
    currentUser,
    requireAuth,
    upload.fields([
        {name: "video", maxCount: 1},
        {name: "photo", maxCount: 1}
    ]),
    async (req, res) =>
    {
        const user = await User
            .findOne({_id: req.currentUser!.id, role: Role.SELLER}).populate("media");

        if (!user)
        {
            throw new NotFoundError();
        }

        if (req.files)
        {
            const files = req.files;
            let fileType;
            let fileUrl;

            if ("photo" in files && files["photo"].length > 0)
            {
                fileType = MediaType.IMAGE;
                fileUrl = files["photo"][0].path;
            }
            if ("video" in files && files["video"].length > 0)
            {
                fileType = MediaType.VIDEO;
                fileUrl = files["video"][0].path;
            }

            if (fileType && fileUrl)
            {
                const media = Media.build({url: fileUrl, type: fileType});

                await media.save();
                user.media.push(media);
                await user.save();
            }
        }

        res.status(201).send("Uploaded successfully.");
    });

router.delete("/api/users/delete/:id",
    currentUser,
    requireAuth,
    async (req, res) =>
    {
        const user = await User
            .findOne({_id: req.currentUser!.id, role: Role.SELLER}).populate("media");

        if (!user)
        {
            throw new NotFoundError();
        }

        const index = user.media.findIndex(media => media._id.equals(req.params.id));

        if (index !== -1)
        {
            user.media.splice(index, 1);

            await Media.deleteOne({_id: req.params.id});

            // Save the user object to persist the changes
            await user.save();

            return res.status(200).send("Successfully deleted.");
        }

        throw new NotFoundError();
    });

export {router as uploadRouter};