import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { DataBase } from "../DataBase";
import { SessionTokenDataAccess } from "../SessionTokenDataAccess";
import { Account, SessionToken } from "../../model/AuthModel";
import * as IdGenerator from "../IdGenerator";
const insertMock = vi.fn();
const getByMock = vi.fn();
const updateByMock = vi.fn();
const deleteByMock = vi.fn();
const getAllElementsByMock = vi.fn();
vi.mock("../..//data/DataBase", () => {
  return {
    DataBase: vi.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
        update: updateByMock,
        getAllElements: getAllElementsByMock,
        delete: deleteByMock,
      };
    }),
  };
});
describe("ReservationsDataAccess test suit", () => {
  let suit: SessionTokenDataAccess;

  const sesonId = "1234";
  beforeEach(() => {
    suit = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    vi.spyOn(global.Date, "now").mockReturnValue(0);
    vi.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(sesonId);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Custom Generate random id to return 1234 so we can controle the data base id", () => {
    const actual = IdGenerator.generateRandomId();
    expect(actual).toBe(sesonId);
  });
  it("mock, we mocke insert from Database on our suit instence so we can store the seson ", async () => {
    const someAccount: Account = {
      id: "",
      userName: "someUserName",
      password: "someUserPassword",
    };
    const sesonProperty: SessionToken = {
      id: "",
      userName: someAccount.userName,
      valid: true,
      expirationDate: new Date(60 * 60 * 1000),
    };
    insertMock.mockResolvedValue(sesonId);
    const actual = await suit.generateToken(someAccount);
    expect(actual).toBe(sesonId);
    expect(insertMock).toHaveBeenCalledWith(sesonProperty);
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke update from Database on our suit instence so we update the seson to invalid", async () => {
    await suit.invalidateToken(sesonId);
    expect(updateByMock).toHaveBeenCalledWith(sesonId, "valid", false);
    expect(updateByMock).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke getBy from Database on our suit instence so we can get the seson status", async () => {
    getByMock.mockResolvedValue({ valid: true });
    const actual = await suit.isValidToken(sesonId);
    expect(actual).toBe(true);
  });
  it("mock, we mocke getBy from Database on our suit instence so we can get the seson status ", async () => {
    getByMock.mockResolvedValue({ valid: false });
    const actual = await suit.isValidToken(sesonId);
    expect(actual).toBe(false);
  });
  it("mock, we mocke getBy from Database on our suit instence so we can get the seson status", async () => {
    getByMock.mockResolvedValue({});
    const actual = await suit.isValidToken(sesonId);
    expect(actual).toBeUndefined();
  });
  it("mock, we mocke getBy from Database on our suit instence so we can get the seson status", async () => {
    getByMock.mockResolvedValue(undefined);
    const actual = await suit.isValidToken({} as any);
    expect(actual).toBe(false);
  });
});
