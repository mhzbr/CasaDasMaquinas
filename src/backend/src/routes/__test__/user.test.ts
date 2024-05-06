import request from "supertest";
import {app} from "../../app";
import {Profile} from "../../models/profile";

it("Retrieves current user (seller)", async () =>
{
    const cookie = await global.sellerSignUp();

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie[1])
        .send()
        .expect(200);

    expect(response.body.firstName).toEqual("Joe");
    expect(response.body.lastName).toEqual("Doe");
    expect(response.body.email).toEqual("test@test.com");
    expect(response.body.profile.cpf).toEqual(cookie[0]);
});

it("Retrieves current user (client)", async () =>
{
    const cookie = await global.signin();

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie) // Setting up cookie
        .send()
        .expect(200);

    expect(response.body.firstName).toEqual("Joe");
    expect(response.body.lastName).toEqual("Doe");
    expect(response.body.email).toEqual("test@test.com");
});

it("Retrieves seller info", async () =>
{
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            email: "test@test.com",
            cpf: "12345678910",
            password: "password"
        })
        .expect(201);

    const seller = await request(app)
        .get(`/api/users/${response.body.id}`)
        // @ts-ignore
        .set("Cookie", response.get("Set-Cookie"))
        .send()
        .expect(200);

    expect(seller.body.firstName).toEqual("Joe");
    expect(seller.body.lastName).toEqual("Doe");
    expect(seller.body.email).toEqual("test@test.com");
    expect(seller.body.cpf).toEqual("12345678910");
});

it("Retrieves all users", async () =>
{
    await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "12345678910",
            email: "test@test.com",
            password: "password"
        });

    await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "12345678910",
            email: "test2@test.com",
            password: "password"
        });

    await request(app)
        .post("/api/users/signup")
        .send({
            firstName: "Joe",
            lastName: "Doe",
            cpf: "12345678910",
            email: "test1@test.com",
            password: "password"
        });

    const users = await Profile.find({});

    expect(users.length).toEqual(3);
});

it("Updates current user's profile (seller)", async () =>
{
    const cookie = await global.sellerSignUp();

    const response = await request(app)
        .put("/api/users/currentuser")
        .set("Cookie", cookie)
        .send({
            footLength: 12.2,
            lastName: "Ze"
        })
        .expect(200);

    expect(response.body.footLength).toEqual(12.2);
    expect(response.body.lastName).toEqual("Ze");
    expect(response.body.email).toEqual("test@test.com");
    expect(response.body.cpf).toEqual("12345678910");
});

it("Updates current user's profile (client)", async () =>
{
    const cookie = await global.clientSignUp();

    const response = await request(app)
        .put("/api/users/currentuser")
        .set("Cookie", cookie)
        .send({
            firstName: "Hey",
            lastName: "Ze"
        })
        .expect(200);


    expect(response.body.firstName).toEqual("Hey");
    expect(response.body.lastName).toEqual("Ze");
    expect(response.body.email).toEqual("test@test.com");
});