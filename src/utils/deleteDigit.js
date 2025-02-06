import { calculate } from "./calculate.js";

export function deleteDigit(state) {
  if (state.overwrite) {
    return { ...state, overwrite: false, currentOperand: null, equation: "", result: "" };
  }

  if (state.currentOperand === null) return state;

  const trimmedEquation = state.equation.slice(0, -1);
  return { ...state, currentOperand: state.currentOperand.slice(0, -1), equation: trimmedEquation, result: calculate(trimmedEquation) };
}