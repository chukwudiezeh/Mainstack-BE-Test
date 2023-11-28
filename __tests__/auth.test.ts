import request  from "supertest";
import app from "../src/server";
import { faker } from "@faker-js/faker";


describe ("User authentication", () => {
    //Register tests
    describe("Register route", () => {
        describe ("Given that an empty payload was sent", () => {
            it ("should return a 400 validation error", async () => {
                const payload = {}
                const res = await request(app).post("/api/v1/auth/register").send(payload);
                expect(res.status).toBe(400);
            });
        });

        describe ("Given one or more wrong payload field", () => {
            it("should return a 400 validation error", async () => {
                const payload = {
                    firstName: "Chukwudi",
                    lastName: "Ezeh",
                    email: "cezeh96@",
                    phoneNumber: "123455",
                    password: "123456"
                }
                const res = await request(app).post("/api/v1/auth/register").send(payload);
                expect(res.status).toBe(400);
            });
        });

        describe ("Given all payload fields are correct", () => {
            it("should return a 201 success response", async () => {
                const payload = {
                    firstName: "Chukwudi",
                    lastName: "Ezeh",
                    email: faker.internet.email(),
                    phoneNumber: faker.phone.number(),
                    password: "123456"
                }
                const res = await request(app).post("/api/v1/auth/register").send(payload);
                expect(res.status).toBe(201);
            });
        });
    });

    //Login test
    describe("Login route", () => {
        describe ("Given that an empty payload was sent", () => {
            it ("should return a 400 validation error", async () => {
                const payload = {}
                const res = await request(app).post("/api/v1/auth/login").send(payload);
                expect(res.status).toBe(400);
            });
        });

        describe ("Given one or more wrong payload field", () => {
            it("should return a 401 unauthorized error", async () => {
                const payload = {
                    email: "cezeh96@gmail.com",
                    password: "123456sfdegfbdb"
                }
                const res = await request(app).post("/api/v1/auth/login").send(payload);
                expect(res.status).toBe(401);
            });
        });

        describe ("Given all payload fields are correct", () => {
            it("should return a 201 success response", async () => {
                const payload = {
                    email: "cezeh96@gmail.com",
                    password: "123456"
                }
                const res = await request(app).post("/api/v1/auth/login").send(payload);
                expect(res.status).toBe(200);
            })
        })
    })
})