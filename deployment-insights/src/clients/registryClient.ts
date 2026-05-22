import axios from "axios";
import axiosRetry from "axios-retry";

const registryClient = axios.create({
  baseURL: "http://localhost:5176/api",
  timeout: 3000
});

axiosRetry(registryClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});

export async function getDeployments() {
  const response = await registryClient.get("/deployments");
  return response.data;
}