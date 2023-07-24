export function uperCase(arg: string) {
  return arg.toUpperCase();
}
export type stringInfo = {
  lowercase: string;
  upercase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function stringInfo(arg: string): stringInfo {
  return {
    lowercase: arg.toLocaleLowerCase(),
    upercase: arg.toLocaleUpperCase(),
    characters: arg.split(""),
    length: arg.length,
    extraInfo: {},
  };
}
export class StringUtil {
  public testUpercase(arg: string): string {
    if (!arg || arg.length <= 0 || arg === "uwu")
      throw new Error("invalid argument");
    return arg.toLocaleUpperCase();
  }
}
