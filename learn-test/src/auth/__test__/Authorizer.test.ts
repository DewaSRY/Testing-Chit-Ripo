import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { Authorizer } from "../Authorizer";
import { SessionTokenDataAccess } from "../../data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../data/UserCredentialsDataAccess";

// SessionTokenDataAccess mocks:
const isValidTokenMock = vi.fn();
const generateTokenMock = vi.fn();
const invalidateTokenMock = vi.fn();
vi.mock("../../data/SessionTokenDataAccess", () => {
  return {
    SessionTokenDataAccess: vi.fn().mockImplementation(() => {
      return {
        isValidToken: isValidTokenMock,
        generateToken: generateTokenMock,
        invalidateToken: invalidateTokenMock,
      };
    }),
  };
});
const addUserMock = vi.fn();
const getUserByUserNameMock = vi.fn();
vi.mock("../../data/UserCredentialsDataAccess", () => {
  return {
    UserCredentialsDataAccess: vi.fn().mockImplementation(() => {
      return {
        addUser: addUserMock,
        getUserByUserName: getUserByUserNameMock,
      };
    }),
  };
});

describe("Authorizer test suite", () => {
  let sut: Authorizer;

  const someId = "1234";
  const someUserName = "someUserName";
  const somePassword = "somePassword";

  beforeEach(() => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toHaveBeenCalledTimes(1);
    expect(UserCredentialsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should validate token", async () => {
    isValidTokenMock.mockResolvedValueOnce(false);

    const actual = await sut.validateToken(someId);

    expect(actual).toBe(false);
  });

  it("should return id for new registered user", async () => {
    addUserMock.mockResolvedValueOnce(someId);

    const actual = await sut.registerUser(someUserName, somePassword);

    expect(actual).toBe(someId);
    expect(addUserMock).toBeCalledWith({
      id: "",
      password: somePassword,
      userName: someUserName,
    });
  });

  it("should return tokenId for valid credentials", async () => {
    getUserByUserNameMock.mockResolvedValueOnce({
      password: somePassword,
    });
    generateTokenMock.mockResolvedValueOnce(someId);

    const actual = await sut.login(someUserName, somePassword);

    expect(actual).toBe(someId);
  });

  it("should return undefined for invalid credentials", async () => {
    getUserByUserNameMock.mockResolvedValueOnce({
      password: somePassword,
    });
    generateTokenMock.mockResolvedValueOnce(someId);

    const actual = await sut.login(someUserName, "someOtherPassword");

    expect(actual).toBeUndefined();
  });

  it("should invalidate token on logout call", async () => {
    await sut.logout(someId);

    expect(invalidateTokenMock).toBeCalledWith(someId);
  });
});
