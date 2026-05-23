import request from "supertest";
import express from "express";

describe("Health Endpoint", () => {
  it("returns UP status", async () => {
    const app = express();

    app.get("/health", (_, res) => {
      res.json({
        status: "UP"
      });
    });

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "UP"
    });
  });
});