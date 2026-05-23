export interface Deployment {
  serviceName: string;
  environment: string;
  version: string;
  status: string;
  startedAt: string;
  finishedAt?: string;
}