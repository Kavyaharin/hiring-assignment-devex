import { getDeployments } from "../clients/registryClient";

export async function getDeploymentFrequency() {
  const deployments = await getDeployments();

  const frequency: Record<string, number> = {};

  for (const deployment of deployments) {
    const service = deployment.serviceName;

    frequency[service] = (frequency[service] || 0) + 1;
  }

  return frequency;
}

export async function getLeadTime() {
  const deployments = await getDeployments();

  const successfulDeployments = deployments.filter(
    (deployment: any) =>
      deployment.status === "Succeeded" &&
      deployment.startedAt &&
      deployment.finishedAt
  );

  const grouped: Record<string, number[]> = {};

  for (const deployment of successfulDeployments) {
    const service = deployment.serviceName;

    const started = new Date(deployment.startedAt).getTime();
    const finished = new Date(deployment.finishedAt).getTime();

    const durationMinutes = (finished - started) / 1000 / 60;

    if (!grouped[service]) {
      grouped[service] = [];
    }

    grouped[service].push(durationMinutes);
  }

  const averages: Record<string, number> = {};

  for (const service in grouped) {
    const values = grouped[service];

    const total = values.reduce((sum, value) => sum + value, 0);

    averages[service] = Number((total / values.length).toFixed(2));
  }

  return averages;
}

export async function getFailureRate() {
  const deployments = await getDeployments();

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

export async function getLatestDeployments() {
  const deployments = await getDeployments();

  const latest: Record<string, any> = {};

  for (const deployment of deployments) {
    const key = `${deployment.serviceName}-${deployment.environment}`;

    if (
      !latest[key] ||
      new Date(deployment.startedAt) >
        new Date(latest[key].startedAt)
    ) {
      latest[key] = {
        version: deployment.version,
        startedAt: deployment.startedAt
      };
    }
  }

  return latest;
}