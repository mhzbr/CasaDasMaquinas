import express from "express";
import {currentUser, NotAuthorizedError, NotFoundError, requireAuth} from "@sgtickers-course/common";
import {upload} from "../../services/multer-upload";
import {User} from "../../models/user";
import {Role} from "../../models/enums/role";
import {filterOutFalseValues} from "../../services/filter";

const router = express.Router();

router.put("/api/users/currentuser",
    currentUser,
    requireAuth,
    upload.fields([
        {name: "video", maxCount: 1},
        {name: "photo", maxCount: 1}
    ]),
    async (req, res) =>
    {
        const user = await User
            .findOne({_id: req.currentUser!.id, role: Role.SELLER})
            .populate("profile").populate("media");

        if (!user)
        {
            throw new NotFoundError();
        }

        let updateFields: any = {};

        updateFields.firstName = req.body.firstName;
        updateFields.lastName = req.body.lastName;

        if (user.role === Role.SELLER)
        {
            let photoPath, videoPath = undefined;

            if (req.files)
            {
                const files = req.files;

                if ("photo" in files && files["photo"].length > 0)
                {
                    photoPath = files["photo"][0].path;
                }
                if ("video" in files && files["video"].length > 0)
                {
                    videoPath = files["video"][0].path;
                }
            }

            const profile = req.body.profile || {};

            updateFields.profile = {
                cpf: user.profile.cpf,
                about: profile.about || user.profile.about,
                stars: profile.stars || user.profile.stars,
                footLength: profile.footLength || user.profile.footLength,
                birthDate: profile.birthDate || user.profile.birthDate,
                sexuality: profile.sexuality || user.profile.sexuality,
                genre: profile.genre || user.profile.genre,
                height: profile.height || user.profile.height,
                weight: profile.weight || user.profile.weight,
                region: profile.region || user.profile.region,
                startTime: profile.startTime || user.profile.startTime,
                endTime: profile.endTime || user.profile.endTime,
                local: profile.local || user.profile.local,
                description: profile.description || user.profile.description,
                valuePerHour: profile.valuePerHour || user.profile.valuePerHour,
                photoPath: photoPath || user.profile.photoPath,
                videoPath: videoPath || user.profile.videoPath
            };
        }

        updateFields = filterOutFalseValues(updateFields);

        user.set(updateFields);
        await user.save();

        res.send(user);
    });

router.put("/api/users/admin/:id",
    currentUser,
    requireAuth,
    async (req, res) =>
    {
        if (req.currentUser!.role !== Role.ADMIN)
        {
            throw new NotAuthorizedError();
        }

        let user = await User.findById(req.currentUser!.id);

        if (!user)
        {
            throw new NotFoundError();
        }
        else if (user.role === Role.SELLER)
        {
            user = await user.populate("profile");
        }

        let updateFields: any = {};

        updateFields.firstName = req.body.firstName;
        updateFields.lastName = req.body.lastName;
        updateFields.email = req.body.email;
        updateFields.password = req.body.password;

        if (user.role === Role.SELLER && req.body.profile)
        {
            let photoPath, videoPath = undefined;

            if (req.files)
            {
                const files = req.files;

                if ("photo" in files && files["photo"].length > 0)
                {
                    photoPath = files["photo"][0].path;
                }
                if ("video" in files && files["video"].length > 0)
                {
                    videoPath = files["video"][0].path;
                }
            }

            const {profile} = req.body;

            updateFields.profile = {
                cpf: profile.cpf || user.profile.cpf,
                about: profile.about || user.profile.about,
                stars: profile.stars || user.profile.stars,
                footLength: profile.footLength || user.profile.footLength,
                birthDate: profile.birthDate || user.profile.birthDate,
                sexuality: profile.sexuality || user.profile.sexuality,
                genre: profile.genre || user.profile.genre,
                height: profile.height || user.profile.height,
                weight: profile.weight || user.profile.weight,
                region: profile.region || user.profile.region,
                startTime: profile.startTime || user.profile.startTime,
                endTime: profile.endTime || user.profile.endTime,
                local: profile.local || user.profile.local,
                description: profile.description || user.profile.description,
                valuePerHour: profile.valuePerHour || user.profile.valuePerHour,
                verifiedProfile: profile.verifiedProfile || user.profile.verifiedProfile,
                photoPath: photoPath || user.profile.photoPath,
                videoPath: videoPath || user.profile.videoPath
            };
        }

        updateFields = filterOutFalseValues(updateFields);

        user.set(updateFields);
        await user.save();

        console.log(updateFields);

        res.send(user);
    });

export {router as updateCurrentUserRouter};