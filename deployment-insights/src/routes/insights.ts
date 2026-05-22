import { Router } from "express";

import {
  getDeploymentFrequency,
  getLeadTime,
  getFailureRate,
  getLatestDeployments
} from "../services/insightsService";

const router = Router();

router.get("/frequency", async (_, res) => {
  const data = await getDeploymentFrequency();
  res.json(data);
});

router.get("/lead-time", async (_, res) => {
  const data = await getLeadTime();
  res.json(data);
});

router.get("/failure-rate", async (_, res) => {
  const data = await getFailureRate();
  res.json(data);
});

router.get("/latest", async (_, res) => {
  const data = await getLatestDeployments();
  res.json(data);
});

export default router;