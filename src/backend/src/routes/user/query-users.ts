import express, {Request, Response} from "express";
import {currentUser, NotAuthorizedError, NotFoundError, requireAuth, validateRequest} from "@sgtickers-course/common";
import {User} from "../../models/user";
import {Role} from "../../models/enums/role";
import {getFilters, getMongooseFilters} from "../../services/filter";
import {getOrderBy} from "../../services/orderby";

const router = express.Router();

router.get("/api/users",
    validateRequest,
    async (req: Request, res: Response) =>
    {
        const sort: {} = getOrderBy(req.query);
        const pageString = req.query.page as string | undefined;
        const limitString = req.query.limit as string | undefined;
        const page: number = pageString && !isNaN(parseInt(pageString, 10)) ? parseInt(pageString, 10) : 1;
        const limit: number = limitString && !isNaN(parseInt(limitString, 10)) ? parseInt(limitString, 10) : 10;

        const filtersObject = getFilters(req.query.filter);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        if (filtersObject)
        {
            const mongooseFilters = getMongooseFilters(filtersObject);
            let users = await User.find(mongooseFilters).sort(sort).populate("profile").populate("media");

            if (filtersObject.minAge && filtersObject.maxAge)
            {
                users = users.filter((user) =>
                {
                    return user.profile.age &&
                        ((user.profile.age <= filtersObject.maxAge!) &&
                            (user.profile.age >= filtersObject.minAge!));
                });
            }

            if (filtersObject.isOnline)
            {
                users.sort((a, b) =>
                {
                    return a.profile.isWorking === b.profile.isWorking ? 0 : a.profile.isWorking ? -1 : 1;
                })
            }

            const slicedUsers = users.slice(startIndex, endIndex);

            return res.send({
                users: slicedUsers || [],
                totalPages: Math.ceil(users.length / limit)
            });
        }

        const users = await User.find({role: Role.SELLER})
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("profile").populate("media");

        res.send({
            users: users || [],
            totalPages: Math.ceil((await User.countDocuments({role: Role.SELLER})) / limit)
        });
    });

router.get("/api/users/admin/:id",
    currentUser,
    requireAuth,
    async (req, res) =>
    {
        if (req.currentUser!.role !== Role.ADMIN)
        {
            throw new NotAuthorizedError();
        }

        let user;

        if (Role.SELLER)
        {
            user = await User.findById(req.params.id).populate("profile");
        }
        else
        {
            user = await User.findById(req.params.id);
        }


        if (!user)
        {
            throw new NotFoundError();
        }

        res.send(user);
    });

router.get("/api/users/:id",
    async (req, res) =>
    {
        const user = await User.findOne({_id: req.params.id, role: Role.SELLER}).populate("profile");

        if (!user)
        {
            throw new NotFoundError();
        }

        res.send(user);
    });

export {router as userRouter};