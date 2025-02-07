import { chooseOperation } from "./chooseOperation";

describe("chooseOperation", () => {
  test("should return state unchanged if currentOperand is null and equation is empty", () => {
    const state = {
      currentOperand: null,
      equation: "",
      overwrite: false,
      result: "",
    };
    const newState = chooseOperation(state, "+");
    expect(newState).toEqual(state); // Keine Änderung erwartet
  });

  test("should append operation to result if overwrite is true", () => {
    const state = {
      result: "5",
      overwrite: true,
      equation: "",
      currentOperand: null,
    };
    const newState = chooseOperation(state, "+");
    expect(newState.equation).toBe("5 + ");
    expect(newState.currentOperand).toBeNull();
    expect(newState.overwrite).toBe(false);
  });

  test("should replace last operator if equation ends with an operator", () => {
    const state = {
      equation: "5 + ",
      currentOperand: null,
      overwrite: false,
      result: "5",
    };
    const newState = chooseOperation(state, "-");
    expect(newState.equation).toBe("5 - "); // Das "+" wird durch "-" ersetzt
  });

  test("should add an operation to equation if valid", () => {
    const state = {
      equation: "5",
      currentOperand: "5",
      overwrite: false,
      result: "5",
    };
    const newState = chooseOperation(state, "*");
    expect(newState.equation).toBe("5 * ");
  });

  test("should not modify state if currentOperand is null but equation is not empty", () => {
    const state = {
      equation: "5",
      currentOperand: null,
      overwrite: false,
      result: "5",
    };
    const newState = chooseOperation(state, "+");
    expect(newState.equation).toBe("5 + ");
  });
});