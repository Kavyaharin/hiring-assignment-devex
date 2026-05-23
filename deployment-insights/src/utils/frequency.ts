import { Deployment } from "../types/deployment";

export function calculateFrequency(deployments: Deployment[]) {
  const frequency: Record<string, number> = {};

  for (const deployment of deployments) {
    const service = deployment.serviceName;

    frequency[service] = (frequency[service] || 0) + 1;
  }

  return frequency;
}