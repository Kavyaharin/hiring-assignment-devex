import { Router } from "express";

import {
  getDeploymentFrequency,
  getLeadTime,
  getFailureRate,
  getLatestDeployments
} from "../services/insightsService";

const router = Router();

router.get("/frequency", async (_, res, next) => {
  try {
    const data = await getDeploymentFrequency();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/lead-time", async (_, res, next) => {
  try {
    const data = await getLeadTime();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/failure-rate", async (_, res, next) => {
  try {
    const data = await getFailureRate();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/latest", async (_, res, next) => {
  try {
    const data = await getLatestDeployments();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;