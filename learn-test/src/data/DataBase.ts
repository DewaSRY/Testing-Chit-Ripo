import { generateRandomId } from "./IdGenerator";

type ObjectWithId = {
  id: string;
};
export class DataBase<T extends ObjectWithId> {
  private elements = new Array<T>();
  async insert(arg: T) {
    arg.id = generateRandomId();
    this.elements.push(arg);
    return arg.id;
  }
  async getBy(argName: string, argValue: string) {
    return this.elements.find((x) => x[argName] === argValue);
  }
  async findAllBy(argName: string, argValue: string) {
    return this.elements.filter((x) => x[argName] === argValue);
  }
  async update(id: string, argName: string, argValue: any) {
    const index = this.elements.findIndex((x) => x.id === id);
    this.elements[index][argName] = argValue;
  }
  async delete(id: string) {
    const index = this.elements.findIndex((x) => x.id === id);
    this.elements.splice(index, 1);
  }
  async getAllElements() {
    return this.elements;
  }
}
