import { calculateFailureRate } from "../../src/utils/failureRate";

describe("calculateFailureRate", () => {
  it("calculates failure percentage per service/environment", () => {
    const deployments = [
      {
        serviceName: "payments",
        environment: "prod",
        status: "Succeeded"
      },
      {
        serviceName: "payments",
        environment: "prod",
        status: "Failed"
      },
      {
        serviceName: "payments",
        environment: "prod",
        status: "RolledBack"
      }
    ];

    const result = calculateFailureRate(deployments);

    expect(result).toEqual({
      "payments-prod": 66.67
    });
  });
});