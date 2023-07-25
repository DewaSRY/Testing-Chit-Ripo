import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { DataBase } from "../DataBase";

import { ReservationsDataAccess } from "../ReservationsDataAccess";
import { Reservation } from "../../model/ReservationModel";
const insertMock = vi.fn();
const getByMock = vi.fn();
const updateByMock = vi.fn();
const deleteByMock = vi.fn();
const getAllElementsByMock = vi.fn();
vi.mock("../DataBase", () => {
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
  let suit: ReservationsDataAccess;
  const someReservation: Reservation = {
    id: "",
    room: "someROme",
    user: "someUser",
    startDate: "someStartDate",
    endDate: "someEndDate",
  };
  const updateReservation: Reservation = {
    id: "",
    room: "updateROme",
    user: "updateUser",
    startDate: "updateStartDate",
    endDate: "updateEndDate",
  };
  const someid = "1234";
  beforeEach(() => {
    suit = new ReservationsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Mock, we mock Data base as the dependecc of suit ", () => {
    expect(DataBase).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke inser from Database on our suit instence so we can store the data ", async () => {
    insertMock.mockResolvedValueOnce(someid);
    const actualId = await suit.createReservation(someReservation);
    expect(actualId).toBe(someid);
    expect(insertMock).toHaveBeenCalledWith(someReservation);
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke gtBy from Database on our suit instence so we can return the data match with id we put", async () => {
    getByMock.mockResolvedValueOnce(someReservation);
    const actualReservation = await suit.getReservation(someid);
    expect(actualReservation).toEqual(someReservation);
    expect(getByMock).toHaveBeenCalledWith("id", someid);
    expect(getByMock).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke delete from Database on our suit instence so the data get delete", async () => {
    await suit.deleteReservation(someReservation.id);
    expect(deleteByMock).toHaveBeenCalledWith(someReservation.id);
    expect(deleteByMock).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke insert from Database on our suit instence so we can update data match with the id", async () => {
    await suit.updateReservation(someid, "user", updateReservation.user);
    expect(updateByMock).toHaveBeenCalledWith(
      someid,
      "user",
      updateReservation.user
    );
    expect(updateByMock).toHaveBeenCalledTimes(1);
  });
  it("mock, we mocke getAll from Database on our suit instence so we can get all data we store", async () => {
    const expectedresult = [someReservation, updateReservation];
    getAllElementsByMock.mockResolvedValueOnce(expectedresult);
    await suit.createReservation(someReservation);
    await suit.createReservation(updateReservation);
    const actualAllResult = await suit.getAllReservations();
    expect(actualAllResult).toEqual(expectedresult);
    expect(getAllElementsByMock).toBeCalledTimes(1);
    expect(insertMock).toBeCalledTimes(2);
  });
});
