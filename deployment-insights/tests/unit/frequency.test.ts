import { calculateFrequency } from "../../src/utils/frequency";

describe("calculateFrequency", () => {
  it("groups deployments by service", () => {
    const deployments = [
      { serviceName: "payments" },
      { serviceName: "payments" },
      { serviceName: "orders" }
    ];

    const result = calculateFrequency(deployments);

    expect(result).toEqual({
      payments: 2,
      orders: 1
    });
  });
});