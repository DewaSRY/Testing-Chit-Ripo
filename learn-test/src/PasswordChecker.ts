type ChartStatus = "low" | "up";
type PasswordMap = { [key: string]: boolean };
export class PasswordChecker {
  public checkPassword(password: string) {
    const lengthValid = this.lengthChecker(password);
    const lowerValid = this.carrStatusChech(password, "low");
    const uperValid = this.carrStatusChech(password, "up");
    const numberValid = this.numberChehck(password);
    return lengthValid && lowerValid && uperValid && numberValid;
  }
  carrStatusChech(passWord: string, status: ChartStatus): boolean {
    let comperCar: string = "";
    const passMap = this.mapedPassword(passWord);
    if (status === "low") comperCar = passWord.toLocaleLowerCase();
    else if (status === "up") comperCar = passWord.toLocaleUpperCase();
    for (let car of comperCar) {
      if (passMap[car]) return passMap[car];
    }
    return false;
  }
  lengthChecker(password: string) {
    return password.length >= 8;
  }
  mapedPassword(password: string): PasswordMap {
    const passwordArray = password.split("");
    const passMap: PasswordMap = {};
    for (let car of passwordArray) {
      if (!passMap[car]) {
        passMap[car] = true;
      }
    }
    return passMap;
  }
  numberChehck(password: string) {
    const hasNumber = /\d/;
    return hasNumber.test(password);
  }
}
