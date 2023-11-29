import request from 'supertest';
import app from '../src/server';

describe("Server.ts test", () => {
  test("test index route", async () => {
    const res= await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.success).toEqual(true);
  });
});