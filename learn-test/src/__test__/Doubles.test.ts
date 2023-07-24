import { it, describe, expect, afterEach, beforeEach, vi } from "vitest";
import {
  calculateComplexity,
  toUppercaseWithCallBack,
  uperChase,
  OtherStringUtils,
} from "../Doubles";

describe("Doubles is the testing consep to switch real object with the custom object  ", () => {
  const dummyInput = "abcd";
  const someinfo = {
    length: 5,
    extraInfo: {
      field1: "someinfo",
      field2: "someinfo",
    },
  };
  it("Dummy, is one of the doubles method where we inser the dumy input to function", () => {
    const actual = uperChase(dummyInput);
    expect(actual).toBe("ABCD");
  });
  it("Stubs, is one of the doubles mmethod where we simplyfy the object inputs", () => {
    const actual = calculateComplexity(someinfo as any);
    expect(actual).toBe(10);
  });
  describe("Fake, is one of the doubles method where we simplify the unit works implementation", () => {
    let suit: (arg: string, cb: (arg: string) => void) => string | undefined;
    beforeEach(() => {
      suit = toUppercaseWithCallBack;
    });

    it("pass nothing on the suit and return undefine", () => {
      const actual = suit("", () => {});
      expect(actual).toBeUndefined();
    });
    it("pass the arg on suit", () => {
      const actual = toUppercaseWithCallBack("abc", () => {});
      expect(actual).toBe("ABC");
    });
  });
  describe("Mock, is one of the doubles method where we use it to track some method behaviour", () => {
    let suit: (arg: string, cb: (arg: string) => void) => string | undefined;
    let cbArg: string[] = [];
    let timesCalled = 0;
    beforeEach(() => {
      suit = toUppercaseWithCallBack;
    });
    function callBackMock(arg: string) {
      cbArg.push(arg);
      timesCalled++;
    }
    afterEach(() => {
      cbArg = [];
      timesCalled = 0;
    });
    it("track suit callback whee the arg undefine", () => {
      const actual = suit("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArg).toContain("invalid argumen");
      expect(timesCalled).toBe(1);
    });
    it("track suit callback whee the arg definet", () => {
      const actual = suit("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArg).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });
  describe("use vitest mock function (' vi.fn() ')", () => {
    let suit: (arg: string, cb: (arg: string) => void) => string | undefined;
    const callBackMock = vi.fn();
    beforeEach(() => {
      suit = toUppercaseWithCallBack;
    });
    afterEach(() => {
      vi.clearAllMocks();
    });
    it("vitest mock method to track callback behaviour on the unit with invaid argumen", () => {
      const actual = suit("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith("invalid argumen");
      expect(callBackMock).toBeCalledTimes(1);
    });
    it("vitest mock method to track callback behaviour on the unit with invaid argumen", () => {
      const actual = suit("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toBeCalledWith("called function with abc");
      expect(callBackMock).toBeCalledTimes(1);
    });
  });
  describe("Spies, is one of the doubles method where we custom some unite functionality,and vitest use  'vi.spyOn()' to do it ", () => {
    let suit: OtherStringUtils;
    beforeEach(() => {
      suit = new OtherStringUtils();
    });
    afterEach(() => {
      vi.clearAllMocks();
    });
    it("use the vi.spyOn to track the 'toUperCase' function on the suit ", () => {
      const toUpperCaseSpy = vi.spyOn(suit, "toUperCase");
      suit.toUperCase("abc");
      expect(toUpperCaseSpy).toBeCalledWith("abc");
    });
    it("use the vi.spyOn to track other module then the suit", () => {
      const spyConsoleModule = vi.spyOn(console, "log");
      suit.logString("abc");
      expect(spyConsoleModule).toBeCalledTimes(1);
    });
    it("use the vi.spyOn to track other module then the suit", () => {
      const spyConsoleModule = vi.spyOn(console, "log");
      (suit as any).callingExternalService();
      expect(spyConsoleModule).toBeCalledTimes(1);
    });
    it("Use spy to replace the implementation of method which mean with this method we can change data inside the object", () => {
      const spyConsoleModule = vi.spyOn(console, "log");
      vi.spyOn(suit as any, "callingExternalService").mockImplementation(() => {
        console.log("change the text functionality some method");
      });
      (suit as any).callingExternalService();
      expect(spyConsoleModule).toBeCalledTimes(1);
      expect(spyConsoleModule).toBeCalledWith(
        "change the text functionality some method"
      );
    });
  });
});
