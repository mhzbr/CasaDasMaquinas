import express from "express";
import {currentUser, NotFoundError, requireAuth} from "@sgtickers-course/common";
import {User} from "../../models/user";

const router = express.Router();

router.get("/api/users/currentuser",
    currentUser,
    requireAuth,
    async (req, res) =>
    {
        const user = await User.findById(req.currentUser!.id);

        if (!user)
        {
            throw new NotFoundError();
        }

        res.send(user);
    });

export {router as currentUserRouter};