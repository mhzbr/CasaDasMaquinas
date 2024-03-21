import express from 'express';

require('express-async-errors');
import {json} from 'body-parser';
import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signUpRouter} from "./routes/signup";
import {signOutRouter} from "./routes/signout";
import {errorHandler} from "@sgtickers-course/common";
import {NotFoundError} from "@sgtickers-course/common";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();

app.use(json());
app.use(
    cookieSession({
        signed: false,
    })
)
app.use(cors());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res) =>
{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};