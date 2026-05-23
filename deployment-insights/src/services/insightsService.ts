import { getDeployments } from "../clients/registryClient";
import { calculateFrequency } from "../utils/frequency";
import { calculateFailureRate } from "../utils/failureRate";
import { Deployment } from "../types/deployment";

export async function getDeploymentFrequency() {
  const deployments = await getDeployments();

  return calculateFrequency(deployments);
}

export async function getLeadTime() {
  const deployments = await getDeployments();

  const successfulDeployments = deployments.filter(
    (deployment: Deployment) =>
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

  return calculateFailureRate(deployments);
}

export async function getLatestDeployments() {
  const deployments = await getDeployments();

  const latest: Record<
    string,
    { version: string; startedAt: string }
  > = {};

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