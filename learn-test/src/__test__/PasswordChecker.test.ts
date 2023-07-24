import { it, describe, expect, beforeEach } from "vitest";
import { PasswordChecker } from "../PasswordChecker";

describe("test drevent development password chechker", () => {
  let suit: PasswordChecker;
  beforeEach(() => {
    suit = new PasswordChecker();
  });
  const validPassword = "Dewa1234";
  describe("password get invalid", () => {
    it("length is less then 8 character", () => {
      const result = suit.lengthChecker("hallo");
      expect(result).toBe(false);
    });
    it("password doesn't have lower case", () => {
      const result = suit.carrStatusChech("HALLOOO", "low");
      expect(result).toBe(false);
    });

    it("password doesn't have uper latter", () => {
      const result = suit.carrStatusChech("hallo", "up");
      expect(result).toBe(false);
    });
    it("password doesn't have number", () => {
      const result = suit.numberChehck("hallo");
      expect(result).toBe(false);
    });
  });
  describe("password get valid", () => {
    it("length more then 8 character", () => {
      const result = suit.lengthChecker(validPassword);
      expect(result).toBe(true);
    });
    it("password have lower case", () => {
      const result = suit.carrStatusChech(validPassword, "low");
      expect(result).toBe(true);
    });
    it("password  have uper latter", () => {
      const result = suit.carrStatusChech(validPassword, "up");
      expect(result).toBe(true);
    });
    it("password have number", () => {
      const result = suit.numberChehck(validPassword);
      expect(result).toBe(true);
    });
    it("final password test", () => {
      const result = suit.checkPassword(validPassword);
      expect(result).toBe(true);
    });
  });
});
