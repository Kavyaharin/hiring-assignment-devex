import { Request, Response } from "express";
import axios from "axios";

export function errorHandler(
  err: Error,
  _: Request,
  res: Response
) {
  console.error(err);

  if (axios.isAxiosError(err)) {
    return res.status(503).json({
      error: "Registry API unavailable"
    });
  }

  return res.status(500).json({
    error: "Internal Server Error"
  });
}