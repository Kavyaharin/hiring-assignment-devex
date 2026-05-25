// src/utils/failureRate.ts

import { Deployment } from "../types/deployment";

export function calculateFailureRate(
  deployments: Deployment[]
) {
  const grouped: Record<
    string,
    {
      total: number;
      failed: number;
      rolledBack: number;
    }
  > = {};

  for (const deployment of deployments) {
    const key = `${deployment.serviceName}-${deployment.environment}`;

    if (!grouped[key]) {
      grouped[key] = {
        total: 0,
        failed: 0,
        rolledBack: 0
      };
    }

    grouped[key].total++;

    if (deployment.status === "Failed") {
      grouped[key].failed++;
    }

    if (deployment.status === "RolledBack") {
      grouped[key].rolledBack++;
    }
  }

  const result: Record<
    string,
    {
      failureRate: number;
      rollbackRate: number;
    }
  > = {};

  for (const key in grouped) {
    const stats = grouped[key];

    const failureRate = Number(
      ((stats.failed / stats.total) * 100).toFixed(2)
    );

    const rollbackRate = Number(
      ((stats.rolledBack / stats.total) * 100).toFixed(2)
    );

    result[key] = {
      failureRate,
      rollbackRate
    };
  }

  return result;
}