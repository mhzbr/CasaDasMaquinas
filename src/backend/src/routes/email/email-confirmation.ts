import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {currentUser, NotFoundError, requireAuth} from "@sgtickers-course/common";
import {Verification} from "../../models/verification";
import {User} from "../../models/user";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function generateToken(email: string, userId: string)
{
    return jwt.sign({email, userId}, process.env.JWT_KEY!, {expiresIn: "1d"});
}

router.get("/email/is-verified",
    currentUser,
    requireAuth,
    async (req, res) =>
    {
        const user = await User.findById(req.currentUser!.id);

        if (!user)
        {
            throw new NotFoundError();
        }

        user.isVerified ? res.sendStatus(200) : res.sendStatus(412);
    });

router.get("/email/send-confirmation",
    currentUser,
    requireAuth,
    async (req, res) =>
    {
        const user = await User.findById(req.currentUser!.id);

        if (!user)
        {
            throw new NotFoundError();
        }

        const token = generateToken(user.email, user.id);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Confirmação de Email",
            html: `<p>Clique <a href="http://localhost:3000/email/confirm/${token}">aqui</a> para confirmar seu email.</p>`,
            encoding: "utf-8"
        };

        transporter.sendMail(mailOptions, (error, info) =>
        {
            if (error)
            {
                console.error(error);
                res.status(500).send("Error sending confirmation email");
            }
            else
            {
                console.log("Email sent: " + info.response);
                res.status(200).send("Confirmation email sent");
            }
        });
    });

router.get("/email/confirm/:token",
    async (req, res) =>
    {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY!) as Verification;
        const {email, userId} = decoded;

        const user = await User.findOne({_id: userId, email: email});

        if (!user)
        {
            throw new NotFoundError();
        }

        user.set({isVerified: true});
        await user.save();

        res.status(200).send("Email confirmed successfully");
    });

export {router as emailConfirmationRouter};