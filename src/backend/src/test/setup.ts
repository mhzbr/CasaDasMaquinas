import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import {app} from "../app";

declare global
{
    var sellerSignUp: () => Promise<string[]>;
    var clientSignUp: () => Promise<string[]>;
    var signin: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () =>
{
    process.env.JWT_KEY = "adasdas";

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () =>
{
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections)
    {
        await collection.deleteMany({});
    }
});

afterAll(async () =>
{
    if (mongo)
    {
        await mongo.stop();
    }

    await mongoose.connection.close();
});

// @ts-ignore
global.signin = async () =>
{
    const firstName = "Joe";
    const lastName = "Doe";
    const email = "test@test.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup?type=consumer")
        .send({
            firstName, lastName, email, password
        })
        .expect(201);

    return response.get("Set-Cookie");
};

function generateRandomDigits(length: number): string
{
    const digits = "0123456789";
    let result = "";

    for (let i = 0; i < length; i++)
    {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result += digits.charAt(randomIndex);
    }

    return result;
}

// @ts-ignore
global.sellerSignUp = async () =>
{
    const firstName = "Joe";
    const lastName = "Doe";
    const email = "test@test.com";
    const cpf = generateRandomDigits(11);
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup")
        .send({
            firstName, lastName, email, cpf, password
        })
        .expect(201);

    return [cpf, response.get("Set-Cookie")];
};

// @ts-ignore
global.clientSignUp = async () =>
{
    const firstName = "Joe";
    const lastName = "Doe";
    const email = "test@test.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup?type=consumer")
        .send({
            firstName, lastName, email, password
        })
        .expect(201);

    return response.get("Set-Cookie");
};