import { HTTP_METHODS } from "../../../model/ServerModel";

export class RequestTestWrapper {
  public body: object;
  public method: HTTP_METHODS;
  public url: string;
  public headers = {};
  public on(event: string, cb: Function) {
    if (event == "data") {
      cb(JSON.stringify(this.body));
    } else {
      cb();
    }
  }
  public clearFields() {
    this.body = undefined;
    this.method = undefined;
    this.url = undefined;
    this.headers = {};
  }
}
