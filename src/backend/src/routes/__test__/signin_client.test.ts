import request from "supertest";
import {app} from "../../app";

it("Fails when a email that does not exist is supplied", async () =>
{
    await request(app)
        .post("/api/users/signin?type=consumer")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400);
});

it("Fails when an incorrect password is supplied", async () =>
{
    await request(app)
        .post("/api/users/signup?type=consumer")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    await request(app)
        .post("/api/users/signin?type=consumer")
        .send({
            email: "test@test.com",
            password: "passwor"
        })
        .expect(400);
});

it("Responds with a cookie when given valid credentials", async () =>
{
    await request(app)
        .post("/api/users/signup?type=consumer")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            email: "test@test.com",
            password: "password"
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signin?type=consumer")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});