// src/utils/failureRate.ts

export function calculateFailureRate(deployments: any[]) {
  const grouped: Record<
    string,
    { total: number; failures: number }
  > = {};

  for (const deployment of deployments) {
    const key = `${deployment.serviceName}-${deployment.environment}`;

    if (!grouped[key]) {
      grouped[key] = {
        total: 0,
        failures: 0
      };
    }

    grouped[key].total += 1;

    if (
      deployment.status === "Failed" ||
      deployment.status === "RolledBack"
    ) {
      grouped[key].failures += 1;
    }
  }

  const result: Record<string, number> = {};

  for (const key in grouped) {
    const item = grouped[key];

    result[key] = Number(
      ((item.failures / item.total) * 100).toFixed(2)
    );
  }

  return result;
}