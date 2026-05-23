import { calculateFailureRate } from "../../src/utils/failureRate";

describe("calculateFailureRate", () => {
  it("calculates failure percentage per service/environment", () => {
    const deployments = [
      {
        serviceName: "payments",
        environment: "prod",
        version: "1.0.0",
        status: "Succeeded",
        startedAt: "2026-05-23T10:00:00Z"
      },
      {
        serviceName: "payments",
        environment: "prod",
        version: "1.0.1",
        status: "Failed",
        startedAt: "2026-05-23T11:00:00Z"
      },
      {
        serviceName: "payments",
        environment: "prod",
        version: "1.0.2",
        status: "RolledBack",
        startedAt: "2026-05-23T12:00:00Z"
      }
    ];

    const result = calculateFailureRate(deployments);

    expect(result).toEqual({
      "payments-prod": 66.67
    });
  });
});