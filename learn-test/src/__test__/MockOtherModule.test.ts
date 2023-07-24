import { it, describe, expect, vi } from "vitest";

import * as OtherUtils from "../Doubles";
vi.mock("../Doubles", async () => {
  const originaUtil = await vi.importActual("../Doubles");
  return {
    ...(originaUtil as object),
    calculateComplexity: () => {
      return 10;
    },
  };
});
const someId = "1234";
vi.mock("uuid", () => ({
  v4: () => someId,
}));
describe("vi.mock alos can be use to mock module, which menas ahole module we use to test get mocke alos the functionality  ", () => {
  it("with the code above we change the calculateComplexity personality where event doesnt input anythong but return 10 as result", () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });
  it("the methode above can use to keep the personality of the module ", () => {
    const result = OtherUtils.uperChase("abc");
    expect(result).toBe("ABC");
  });
  it("we chanfe the module uuid v4 result with the mock methode above ", () => {
    const result = OtherUtils.lowerChaseWithId("ABC");
    expect(result).toContain("abc");
    expect(result).toContain(someId);
    expect(result).toBe("abc" + someId);
  });
});
