import { describe, it, expect, vi } from "vitest";

import { getRequestBody } from "../Utils";
import { IncomingMessage } from "http";

const requestMock = {
  on: vi.fn(),
};
const someObject = {
  name: "john",
  age: 30,
  city: "Paris",
};
const someObjectAsString = JSON.stringify(someObject);
describe("Get request body test suite", () => {
  it("Should return object for valid JSON", async () => {
    requestMock.on.mockImplementation((event, CB) => {
      if (event === "data") {
        CB(someObjectAsString);
      } else {
        CB();
      }
    });
    const arg = requestMock as any as IncomingMessage;
    const actual = await getRequestBody(arg);
    expect(actual).toEqual(someObject);
  });
  it("Should break the function and throw error for invalid JSON", async () => {
    requestMock.on.mockImplementation((event, CB) => {
      if (event === "data") {
        CB("e");
      } else {
        CB();
      }
    });
    const arg = requestMock as any as IncomingMessage;
    const actual = getRequestBody(arg);
    const expectedMasage = "Unexpected token 'e', \"e\" is not valid JSON";
    await expect(actual).rejects.toThrow(expectedMasage);
  });
  it("Should throw error for unexpected  error", async () => {
    const someError = new Error("Something went wrong!");
    requestMock.on.mockImplementation((event, CB) => {
      if (event === "error") {
        CB(someError);
      }
    });
    const arg = requestMock as any as IncomingMessage;
    const actual = getRequestBody(arg);
    await expect(actual).rejects.toThrow(someError.message);
  });
});
