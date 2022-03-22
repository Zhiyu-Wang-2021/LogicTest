export default function strToOperation(str) {
  if (str.length === 0) return "";
  let strArr = str.split("");
  strArr = strArr.map((c, i) => {
    switch (c) {
      case "!":
        return "¬";
      case "<":
        return i > 0 ? "↔" : "";
      case "-":
        return i > 0 && strArr[i - 1] !== "<" ? "→" : "";
      case "/":
        return i > 0 && strArr[i - 1] !== "\\" ? "∧" : "";
      case "\\":
        return i > 0 && strArr[i - 1] !== "/" ? "∨" : "";
      default:
        return c;
    }
  });
  console.log(strArr);
  strArr = strArr.filter((c) => {
    switch (c) {
      case "!":
      case "<":
      case "-":
      case "/":
      case "\\":
      case ">":
        return false;
      default:
        return true;
    }
  });
  let result = strArr.reduce((a, b) => a + b);
  return result;
}
