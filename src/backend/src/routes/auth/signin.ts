import express, {Request, Response} from "express";
import {body} from "express-validator";
import {BadRequestError, validateRequest} from "@sgtickers-course/common";
import {User} from "../../models/user";
import {Password} from "../../services/password";
import jwt from "jsonwebtoken";
import {Role} from "../../models/enums/role";

const router = express.Router();

router.post("/api/users/signin",
    [
        body("email")
            .isEmail()
            .withMessage("Email deve ser válido"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Forneça uma senha")
    ],
    validateRequest,
    async (req: Request, res: Response) =>
    {
        const {email, password} = req.body;

        let existingUser;

        if (req.query.type === "admin")
        {
            existingUser = await User.findOne({email, role: Role.ADMIN});
        }
        else if (req.query.type === "consumer")
        {
            existingUser = await User.findOne({email, role: Role.CLIENT});
        }
        else
        {
            if (!req.body.cpf)
            {
                throw new BadRequestError("CPF não informado");
            }

            const {cpf} = req.body;

            existingUser = await User.findOne({
                email,
                "profile.cpf": cpf,
                role: Role.SELLER
            }).populate("profile");
        }

        if (!existingUser)
        {
            throw new BadRequestError("Credenciais Inválidas");
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if (!passwordsMatch)
        {
            throw new BadRequestError("Credenciais Inválidas");
        }

        let userJwt;

        if (req.query.type)
        {
            userJwt = jwt.sign({
                id: existingUser.id,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role
            }, process.env.JWT_KEY!);
        }
        else
        {
            userJwt = jwt.sign({
                id: existingUser.id,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                cpf: existingUser.profile.cpf,
                role: existingUser.role
            }, process.env.JWT_KEY!);
        }

        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    });

export {router as signInRouter};