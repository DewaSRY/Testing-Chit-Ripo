import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { UserCredentialsDataAccess } from "../UserCredentialsDataAccess";
import { DataBase } from "../DataBase";
import { Account } from "../../model/AuthModel";
import * as IdGenerator from "../IdGenerator";
const insertMock = vi.fn();
const getByMock = vi.fn();
vi.mock("../DataBase", () => {
  return {
    DataBase: vi.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});
describe("UserCredentialDataAccess test suit", () => {
  let suit: UserCredentialsDataAccess;
  const someAcount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };
  const someid = "1234";
  beforeEach(() => {
    suit = new UserCredentialsDataAccess();
    vi.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(someid);
    expect(DataBase).toHaveBeenCalledTimes(1);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("suit addUser will store the acount", async () => {
    insertMock.mockResolvedValueOnce(someid);
    const actualId = await suit.addUser(someAcount);
    expect(actualId).toBe(someid);
    expect(insertMock).toHaveBeenCalledWith(someAcount);
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
  it("Should get user by id", async () => {
    getByMock.mockResolvedValueOnce(someAcount);
    const actualUser = await suit.getUserById(someAcount.id);
    expect(actualUser).toEqual(someAcount);
    expect(getByMock).toHaveBeenCalledWith("id", someAcount.id);
    expect(getByMock).toHaveBeenCalledTimes(1);
  });
  it("Should get user by nmae", async () => {
    getByMock.mockResolvedValueOnce(someAcount);
    const resultUser = await suit.getUserByUserName(someAcount.userName);
    expect(resultUser).toEqual(someAcount);
    expect(getByMock).toHaveBeenCalledWith("userName", someAcount.userName);
    expect(getByMock).toHaveBeenCalledTimes(1);
  });
});
