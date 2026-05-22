import axios from "axios";
import axiosRetry from "axios-retry";

const registryClient = axios.create({
  baseURL: process.env.REGISTRY_API_URL || "http://deployment-registry:8080",
  timeout: 3000
});

axiosRetry(registryClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});

export async function getDeployments() {
  const response = await registryClient.get("/api/deployments");
  return response.data;
}