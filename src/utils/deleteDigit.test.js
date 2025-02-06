import { deleteDigit } from "./deleteDigit";

describe("deleteDigit", () => {
  test("should reset state if overwrite is true", () => {
    const state = { overwrite: true, currentOperand: "123", equation: "123", result: "123" };
    const newState = deleteDigit(state);
    expect(newState).toEqual({ overwrite: false, currentOperand: null, equation: "", result: "" });
  });

  test("should remove last digit from equation and currentOperand", () => {
    const state = { currentOperand: "123", equation: "123", result: "123" };
    const newState = deleteDigit(state);
    expect(newState.currentOperand).toBe("12");
    expect(newState.equation).toBe("12");
  });
});