import { chooseOperation } from "./chooseOperation";

describe("chooseOperation", () => {
  test("should return state unchanged if currentOperand is null and equation is empty", () => {
    const state = {
      currentOperand: null,
      equation: "",
      overwrite: false,
      result: "",
    };
    expect(chooseOperation(state, "+")).toEqual(state); 
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
});