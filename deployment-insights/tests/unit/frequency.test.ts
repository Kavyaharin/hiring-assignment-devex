import { calculateFrequency } from "../../src/utils/frequency";

describe("calculateFrequency", () => {
  it("groups deployments by service", () => {
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
        status: "Succeeded",
        startedAt: "2026-05-23T11:00:00Z"
      },
      {
        serviceName: "orders",
        environment: "staging",
        version: "2.0.0",
        status: "Succeeded",
        startedAt: "2026-05-23T12:00:00Z"
      }
    ];

    const result = calculateFrequency(deployments);

    expect(result).toEqual({
      payments: 2,
      orders: 1
    });
  });
});