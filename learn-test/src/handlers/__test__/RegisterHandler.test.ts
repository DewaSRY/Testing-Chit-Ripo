import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { RegisterHandler } from "../../handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../auth/Authorizer";
import { HTTP_CODES, HTTP_METHODS } from "../../model/ServerModel";
import { Account } from "../../model/AuthModel";
const getRequestBodyMock = vi.fn();
vi.mock("../../utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));
const request = {
  method: undefined,
};
const responseMock = {
  statusCode: 201,
  writeHead: vi.fn(),
  write: vi.fn(),
};
const authorizeMock = {
  registerUser: vi.fn(),
};
const someAcount: Account = {
  id: "",
  password: "somePassword",
  userName: "someUserName",
};
const someId = "1234";
describe("registerhandler test suit", () => {
  let suit: RegisterHandler;
  beforeEach(() => {
    suit = new RegisterHandler(
      request as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizeMock as any as Authorizer
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Should register valid accounts is request ", async () => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce(someAcount);
    authorizeMock.registerUser.mockResolvedValueOnce(someId);
    await suit.handleRequest();
    const headerProperty = {
      "Content-Type": "application/json",
    };
    const stringifyUserId = JSON.stringify({ userId: someId });
    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.write).toBeCalledWith(stringifyUserId);
    expect(responseMock.writeHead).toBeCalledWith(
      HTTP_CODES.CREATED,
      headerProperty
    );
  });
});
