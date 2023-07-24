import { v4 } from "uuid";
export type stringInfo = {
  lowercase: string;
  upercase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};
type loggerCallBack = (arg: string) => void;

export function calculateComplexity(stringInfo: stringInfo) {
  if (!stringInfo.extraInfo) return 0;
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}
export function toUppercaseWithCallBack(arg: string, callback: loggerCallBack) {
  if (arg.length < 1) {
    callback("invalid argumen");
    return;
  }
  callback(`called function with ${arg}`);
  return arg.toUpperCase();
}
export function uperChase(arg: string) {
  return arg.toUpperCase();
}
export function lowerChaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}
export class OtherStringUtils {
  public toUperCase(arg: string) {
    return arg.toUpperCase();
  }
  public logString(arg: string) {
    console.log(arg);
  }
  private callingExternalService() {
    console.log("Calling External Service");
  }
  public callThecalling() {
    this.callingExternalService;
  }
}
