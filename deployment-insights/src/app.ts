import express from "express";
import insightsRouter from "./routes/insights";
import { getDeployments } from "./clients/registryClient";

const app = express();

app.get("/health", async (_, res) => {
  try {
    await getDeployments();

    res.json({
      status: "UP",
      registryApi: "reachable"
    });
  } catch {
    res.status(503).json({
      status: "DOWN",
      registryApi: "unreachable"
    });
  }
});

app.use("/insights", insightsRouter);

export default app;