import { describe, it, expect, vi, afterEach } from "vitest";
import { DataBase } from "../../data/DataBase";
import { HTTP_CODES, HTTP_METHODS } from "../../model/ServerModel";
import { Server } from "../../server/Server";
import { ResponseTestWrapper } from "./Utils/ResponseTestWrapper";
import { RequestTestWrapper } from "./Utils/RequestTestWrapper";
vi.mock("../../app/server_app/data/DataBase");
const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();
const fakeServer = {
  listen: () => {},
  close: () => {},
};
vi.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestWrapper, responseWrapper);
    return fakeServer;
  },
}));
describe("Register requests test suite", () => {
  afterEach(() => {
    requestWrapper.clearFields();
    responseWrapper.clearFields();
  });
  it("should register new users", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.body = {
      userName: "someUserName",
      password: "somePassword",
    };
    requestWrapper.url = "localhost:8080/register";
    vi.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");
    await new Server().startServer();
    await new Promise(process.nextTick); // this solves timing issues
    expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseWrapper.body).toEqual(
      expect.objectContaining({
        userId: expect.any(String),
      })
    );
  });
  it("should reject requests with no userName and password", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.body = {};
    requestWrapper.url = "localhost:8080/register";
    await new Server().startServer();
    await new Promise(process.nextTick); // this solves timing issues
    expect(responseWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseWrapper.body).toBe("userName and password required");
  });
  it("should do nothing for not supported methods", async () => {
    requestWrapper.method = HTTP_METHODS.DELETE;
    requestWrapper.body = {};
    requestWrapper.url = "localhost:8080/register";
    await new Server().startServer();
    await new Promise(process.nextTick); // this solves timing issues
    expect(responseWrapper.statusCode).toBeUndefined();
    expect(responseWrapper.body).toBeUndefined();
  });
});
