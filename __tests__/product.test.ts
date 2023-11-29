import request from "supertest";
import app from "../src/server";

//using a pre-seeded jwt token
const accessToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYyZDRmZTg4Nzg3MzBlODY2NmYzYjEiLCJlbWFpbCI6ImNlemVoOTZAZ21haWwuY29tIiwiaWF0IjoxNzAxMDIzNDI5LCJleHAiOjE3MDE2MjgyMjl9.Lyd4nQswhPVnppC5kmx81iRdviZjV4EekgoEgEItLi0";
describe ("Product Management", () => {
    //get All products for a user
    describe("Get all user products", () => {
        describe("Given that authorization failed", () => {
            it("Should return a 401 unauthorized error", async () => {
                const res = await request(app).get("/api/v1/products");
                expect(res.status).toBe(401);
                expect(res.body.success).toEqual(false);

            })
        })
        describe("Given that authorization passed", () => {
            it("Should return a 200 success response with user products", async () => {
                
                const res = await request(app).get("/api/v1/products").set("Authorization", `Bearer ${accessToken}`);
                expect(res.status).toBe(200);
                expect(res.body.success).toEqual(true);
            })
        })
    })

    describe("create product", () => {
        describe("Given that authorization failed", () => {
            it("Should return a 401 unauthorized error", async () => {
                const res = await request(app).get("/api/v1/products/create");
                expect(res.status).toBe(401)
            })
        })
        describe("Given that authorization passed but validation failed", () => {
            it("Should return a 400 error response", async () => {
                const res = await request(app).post("/api/v1/products/create").send().set("Authorization", `Bearer ${accessToken}`);
                expect(res.status).toBe(400);
                expect(res.body.success).toEqual(false);
            })
        })

        describe("Given that authorization and input validation passed", () => {
            it("Should return a 201 success response with user products", async () => {
                const payload = {name: "A Wonderful product", description: "A lovely description for a wonderful product", price: 500.99}
                const res = await request(app).post("/api/v1/products/create").send(payload).set("Authorization", `Bearer ${accessToken}`);
                expect(res.status).toBe(201);
                expect(res.body.success).toEqual(true);
            })
        })
    });

    describe("Get product", () => {
        describe("Given that authorization and validation passed", () => {
            it("Should return a 200 success response with product", async () => {
                const productPayload = {name: "A Wonderful product", description: "A lovely description for a wonderful product", price: 500.99}
                const productRes = await request(app).post("/api/v1/products/create").send(productPayload).set("Authorization", `Bearer ${accessToken}`);

                const res = await request(app).get(`/api/v1/products/${productRes.body.data._id}`).set("Authorization", `Bearer ${accessToken}`);
                expect(res.status).toBe(200);
                expect(res.body.success).toEqual(true);
            });
        });
    });

    describe("Update product", () => {
        describe("Given that authorization and validation passed", () => {
            it("Should return a 200 success response with product", async () => {
                const productPayload = {name: "A Wonderful product", description: "A lovely description for a wonderful product", price: 500.99};
                const productRes = await request(app).post("/api/v1/products/create").send(productPayload).set("Authorization", `Bearer ${accessToken}`);

                const updatePayload = {description: "A lovely description for a wonderful product with an update"};
                const res = await request(app).put(`/api/v1/products/${productRes.body.data._id}/update`).send(updatePayload).set("Authorization", `Bearer ${accessToken}`);
                expect(res.status).toBe(200);
                expect(res.body.success).toEqual(true);
            })
        });
    })

    describe("Delete one product", () => {
        describe("Given that authorization and validation passed", () => {
            it("Should return a 200 success response", async () => {
                //create a product
                const productPayload = {name: "A Wonderful product", description: "A lovely description for a wonderful product", price: 500.99}
                const productRes = await request(app).post("/api/v1/products/create").send(productPayload).set("Authorization", `Bearer ${accessToken}`);

                //delete the product
                const res = await request(app).delete(`/api/v1/products/${productRes.body.data._id}/delete`).set("Authorization", `Bearer ${accessToken}`);
                expect(res.status).toBe(200);
                expect(res.body.success).toEqual(true);
            })
        });
    })
})