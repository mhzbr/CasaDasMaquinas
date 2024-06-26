import express, {Request, Response} from "express";
import {body} from "express-validator";
import jwt from "jsonwebtoken";
import {User} from "../../models/user";
import {BadRequestError, validateRequest} from "@sgtickers-course/common";
import {Role} from "../../models/enums/role";
import {Profile} from "../../models/profile";

const router = express.Router();

router.post("/api/users/signup", [
        body("email")
            .isEmail()
            .withMessage("Email deve ser válido"),
        body("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Informe a senha"),
        body("firstName")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Informe o primeiro nome"),
        body("lastName")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Informe o sobrenome")
    ],
    validateRequest,
    async (req: Request, res: Response) =>
    {
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser)
        {
            throw new BadRequestError("Email em uso");
        }

        let user;

        if (req.query.type === "admin")
        {
            user = User.build({firstName, lastName, email, password, isVerified: false, role: Role.ADMIN});
        }
        else if (req.query.type === "consumer")
        {
            user = User.build({firstName, lastName, email, password, isVerified: false, role: Role.CLIENT});
        }
        else
        {
            if (!req.body.cpf)
            {
                throw new BadRequestError("CPF não informado");
            }

            const {cpf} = req.body;
            const existingProfile = await Profile.findOne({cpf});

            if (existingProfile)
            {
                throw new BadRequestError("CPF já cadastrado");
            }

            const profile = Profile.build({cpf});
            await profile.save();

            user = User.build({
                firstName,
                lastName,
                email,
                password,
                profile,
                media: [],
                isVerified: false,
                role: Role.SELLER
            });
        }

        await user.save();

        let userJwt;

        if (req.query.type)
        {
            userJwt = jwt.sign({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }, process.env.JWT_KEY!);
        }
        else
        {
            userJwt = jwt.sign({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                cpf: user.profile.cpf,
                role: user.role
            }, process.env.JWT_KEY!);
        }

        // Storing in our session
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    });

export {router as signUpRouter};