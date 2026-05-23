import express from "express";
import insightsRouter from "./routes/insights";
import { getDeployments } from "./clients/registryClient";
import { errorHandler } from "./middleware/errorHandler";

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

app.use(errorHandler);

export default app;