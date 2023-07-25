import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { Server } from "../Server";
import { Authorizer } from "../../auth/Authorizer";
import { LoginHandler } from "../../handlers/LoginHandler";
import { ReservationsDataAccess } from "../../data/ReservationsDataAccess";
import { RegisterHandler } from "../../handlers/RegisterHandler";
import { ReservationsHandler } from "../../handlers/ReservationsHandler";
// import { HTTP_CODES } from "../../model/ServerModel";
vi.mock("../../auth/Authorizer");
vi.mock("../../data/ReservationsDataAccess");
vi.mock("../../handlers/LoginHandler");
vi.mock("../../handlers/RegisterHandler");
vi.mock("../../handlers/ReservationsHandler");
const requestMock = {
  url: "",
  headers: {
    "user-agent": "vi-test",
  },
};
const responseMock = {
  end: vi.fn(),
  writeHead: vi.fn(),
};
const serverMock = {
  listen: vi.fn(),
  close: vi.fn(),
};
vi.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return serverMock;
  },
}));
describe("Server test suite", () => {
  let sut: Server;
  beforeEach(() => {
    sut = new Server();
    expect(Authorizer).toBeCalledTimes(1);
    expect(ReservationsDataAccess).toBeCalledTimes(1);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should start server on port 8080 and end the request", async () => {
    await sut.startServer();
    expect(serverMock.listen).toBeCalledWith(8080);
    // console.log("checking response.end calls:");
    expect(responseMock.end).toBeCalled();
  });
  it("should handle register requests", async () => {
    requestMock.url = "localhost:8080/register";
    const handleRequestSpy = vi.spyOn(
      RegisterHandler.prototype,
      "handleRequest"
    );
    await sut.startServer();
    expect(handleRequestSpy).toBeCalledTimes(1);
    expect(RegisterHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });
  it("should handle login requests", async () => {
    requestMock.url = "localhost:8080/login";
    const handleRequestSpy = vi.spyOn(LoginHandler.prototype, "handleRequest");
    await sut.startServer();
    expect(handleRequestSpy).toBeCalledTimes(1);
    expect(LoginHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });
  it("should handle reservation requests", async () => {
    requestMock.url = "localhost:8080/reservation";
    const handleRequestSpy = vi.spyOn(
      ReservationsHandler.prototype,
      "handleRequest"
    );
    await sut.startServer();
    expect(handleRequestSpy).toBeCalledTimes(1);
    expect(ReservationsHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
  });
  it("should do nothing for not supported routes", async () => {
    requestMock.url = "localhost:8080/someRandomRoute";
    const validateTokenSpy = vi.spyOn(Authorizer.prototype, "validateToken");
    await sut.startServer();
    expect(validateTokenSpy).not.toBeCalled();
  });
});
