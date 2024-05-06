require("dotenv").config({path: __dirname + "/.env"});

import mongoose from "mongoose";
import {app} from "./app";

const start = async () =>
{
    if (!process.env.JWT_KEY)
    {
        throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.MONGO_URI)
    {
        throw new Error("MONGO_URI must be defined");
    }
    if (!process.env.EMAIL_USER)
    {
        throw new Error("EMAIL_USER must be defined");
    }
    if (!process.env.EMAIL_PASSWORD)
    {
        throw new Error("EMAIL_PASSWORD must be defined");
    }

    try
    {
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch (err)
    {
        console.log(err);
    }

    app.listen(3000, () =>
    {
        console.log("Running on port 3000.");
    });
};

start();