import request from "supertest";
import {app} from "../../app";

it("Returns a 201 on successful signup", async () =>
{
    return request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "13443765893",
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
});

it("Returns a 400 with an invalid email", async () =>
{
    return request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "13443765893",
            email: "tescom",
            password: "password"
        })
        .expect(400);
});

// Await and return work similarly.
it("Returns a 400 with missing email and password", async () =>
{
    await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "13443765893",
            email: "test@test.com"
        })
        .expect(400);

    await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "13443765893",
            password: "test@test.com"
        })
        .expect(400);
});

it("Disallows duplicate emails", async () =>
{
    await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "13443765893",
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            cpf: "13443765893",
            password: "password"
        })
        .expect(400);
});

it("Sets a cookie after successful signup", async () =>
{
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "13443765893",
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
});