import { describe, it, expect, beforeEach, vi } from "vitest";
import { DataBase } from "../DataBase";
import * as IdGenerator from "../IdGenerator";
type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suit data base store data as an array withe type T inside it, also need have id on the T", () => {
  let suit: DataBase<SomeTypeWithId>;
  const fakeId = "1234";
  const someObject = {
    id: "",
    name: "someName",
    color: "blue",
  };
  const someObject2 = {
    id: "",
    name: "SomeOtherName",
    color: "blue",
  };
  beforeEach(() => {
    suit = new DataBase<SomeTypeWithId>();
    vi.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });
  it("Custom Generate random id to return 1234 so we can controle the data base id", () => {
    const actual = IdGenerator.generateRandomId();
    expect(actual).toBe(fakeId);
  });
  it("Database insert method insert T data type to array and return teh id", async () => {
    const actual = await suit.insert({ id: "" } as any);
    const mockElement = (suit as any).elements;
    expect(actual).toBe(fakeId);
    expect(mockElement).toEqual([{ id: fakeId }]);
  });
  it("Database insert will pust the data type T to the pivate element", async () => {
    await suit.insert(someObject);
    const mockElement = (suit as any).elements;
    expect(mockElement).toEqual([someObject]);
  });
  it("Database getBy will looking on the stored data element the match data withe propers we put ", async () => {
    const id = await suit.insert(someObject);
    const actual = await suit.getBy("id", id);
    expect(actual).toEqual(someObject);
  });
  it("Database getBy will looking on the stored data element the match data withe propers we put", async () => {
    const id = await suit.insert(someObject);
    const expectedColor = "red";
    await suit.update(id, "color", expectedColor);
    const actual = await suit.getBy("id", id);
    expect(actual!.color).toBe(expectedColor);
  });
  it("Database findAllBy will fond all data match the property we put", async () => {
    await suit.insert(someObject);
    await suit.insert(someObject2);
    await suit.insert(someObject2);
    const expected = [someObject2, someObject2];
    const mockElement = (suit as any).elements;
    const actual = await suit.findAllBy("color", "blue");
    expect(actual).toEqual(expected);
    expect(mockElement).toEqual(expect.arrayContaining(actual));
  });
  it("Database delete will remove the match element withe the id we put", async () => {
    const id = await suit.insert(someObject);

    await suit.delete(id);
    const actual = await suit.getBy("id", id);
    expect(actual).toBeUndefined();
  });
  it("Database getAllElements will returns all element we store on Database", async () => {
    await suit.insert(someObject);
    await suit.insert(someObject2);
    const expected = [someObject, someObject2];
    const actual = await suit.getAllElements();
    expect(actual).toEqual(expected);
  });
});
