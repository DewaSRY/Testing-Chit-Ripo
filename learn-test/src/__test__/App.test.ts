import { it, describe, expect, beforeEach } from "vitest";
import { uperCase, stringInfo, StringUtil } from "../App";
describe("besic test with vites", () => {
  let suit: (arg: string) => string;
  beforeEach(() => {
    suit = uperCase;
  });
  it("test the upercase test", () => {
    const actual = suit("abc");
    expect(actual).toBe("ABC");
  });
});
describe("besic vite expectation matters", () => {
  let suit: typeof stringInfo;
  beforeEach(() => {
    suit = stringInfo;
  });
  const expected = {
    lowercase: "abc",
    upercase: "ABC",
    characters: ["a", "b", "c"],
    length: 3,
    extraInfo: {},
  };

  it("toEqual to assert object result object", () => {
    const result = suit("abc");
    expect(result).toEqual(expected);
    expect(result.characters).toEqual(expected.characters);
    expect(result.extraInfo).toEqual(expected.extraInfo);
  });

  it("toBe to assert primitive type result", () => {
    const result = suit("abc");
    expect(result.lowercase).toBe(expected.lowercase);
    expect(result.upercase).toBe(expected.upercase);
    expect(result.length).toBe(expected.length);
  });
  it("toHaveLength to assert the data length", () => {
    const result = suit("abc");
    expect(result.characters.length).toBe(3);
    expect(result.characters).toHaveLength(3);
  });
  it("toContain to assert th existing element on the sequence", () => {
    const result = suit("abc");
    expect(result.characters).toContain("a");
  });
});
describe("nested expecation on testing", () => {
  let suit: typeof stringInfo;
  beforeEach(() => {
    suit = stringInfo;
  });
  it("this method to check the match unkow order element", () => {
    const result = suit("abc");
    expect(result.characters).toEqual(expect.arrayContaining(["c", "a", "b"]));
  });
  it("this the way check the undefine value", () => {
    const result = suit("abc");
    expect(result.extraInfo).not.toBe(undefined);
    expect(result.extraInfo).not.toBeUndefined();
    expect(result.extraInfo).toBeDefined();
    expect(result.extraInfo).toBeTruthy();
  });
});
describe("learn about parametrized test method", () => {
  it.each([
    { input: "abc", expected: "ABC" },
    { input: "My-String", expected: "MY-STRING" },
    { input: "def", expected: "DEF" },
  ])("$input testStringInfo should be $expected", ({ input, expected }) => {
    const actual = uperCase(input);
    expect(actual).toBe(expected);
  });
});
describe("learn advance test method ", () => {
  let suit: StringUtil;
  beforeEach(() => {
    suit = new StringUtil();
  });

  it("learn how test the class", () => {
    const actual = suit.testUpercase("abc");
    expect(actual).toBe("ABC");
    console.log("actual test");
  });
  it("should throe error on invalid argument('')", () => {
    function expectError() {
      suit.testUpercase("");
    }
    expect(expectError).toThrow();
    expect(expectError).toThrowError("invalid argument");
  });
  it("should throe error on invalid argument('uwu')", () => {
    function expectError() {
      suit.testUpercase("uwu");
    }
    expect(expectError).toThrow();
    expect(expectError).toThrowError("invalid argument");
  });
  it("should throe error on invalid argument('')  with arrow function", () => {
    expect(() => {
      suit.testUpercase("");
    }).toThrow();
    expect(() => {
      suit.testUpercase("");
    }).toThrowError("invalid argument");
  });
  it("should throe error on invalid argument('uwu') with arrow function", () => {
    expect(() => {
      suit.testUpercase("uwu");
    }).toThrow();
    expect(() => {
      suit.testUpercase("uwu");
    }).toThrowError("invalid argument");
  });
  it("should throe error on invalid argument('')  with try catch method", () => {
    try {
      const expec = suit.testUpercase("");
      console.log(expec);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "invalid argument");
    }
  });
  it("should throe error on invalid argument('uwu') withtry catch method", () => {
    try {
      suit.testUpercase("uwu");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "invalid argument");
    }
  });
  it("on this test we leanr about 'done callback'", () => {
    try {
      const result = suit.testUpercase("abc");
      expect(result).toBe("ABC");
    } catch (error) {
      expect(error).toBeUndefined();
      expect(error).not.toThrow();
      expect(error).not.toThrowError();
    }
  });
});
