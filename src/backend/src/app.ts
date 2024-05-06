import express from "express";
require("express-async-errors");
import {json} from "body-parser";
import {errorHandler, NotFoundError} from "@sgtickers-course/common";
import cookieSession from "cookie-session";
import cors from "cors";
import {currentUserRouter} from "./routes/user/current-user";
import {userRouter} from "./routes/user/query-users";
import {signInRouter} from "./routes/auth/signin";
import {signUpRouter} from "./routes/auth/signup";
import {signOutRouter} from "./routes/auth/signout";
import {updateCurrentUserRouter} from "./routes/user/update-user";
import {uploadRouter} from "./routes/media/upload";
import {autoCompleteRouter} from "./routes/other/autocomplete";
import {emailConfirmationRouter} from "./routes/email/email-confirmation";

const app = express();

app.set("trust proxy", true); // Secure traffic
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(json());
app.use(
    cookieSession({
        signed: false
    })
);
app.use("/uploads", express.static("uploads"));

app.use(currentUserRouter);
app.use(userRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(updateCurrentUserRouter);
app.use(uploadRouter);
app.use(autoCompleteRouter);
app.use(emailConfirmationRouter);

app.all("*", async (req, res) =>
{
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};