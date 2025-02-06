import { calculate } from "./calculate";

export function addDigit(state, payload) {
  if (payload.digit === "(-)") {
    const lastNumberMatch = state.equation.match(/-?\d+\.?\d*$/);
    if (!lastNumberMatch) return state;
    const lastNumber = lastNumberMatch[0];

    if (parseFloat(lastNumber) === 0 && !lastNumber.includes(".")) return state;

    const newNumber = (parseFloat(lastNumber) * -1).toString();
    const newEquation = state.equation.replace(/-?\d+\.?\d*$/, newNumber);
    return { ...state, currentOperand: newNumber, equation: newEquation, result: calculate(newEquation) };
  }

  if (payload.digit === ".") {
    const operators = ["+", "-", "*", "÷"];
    const lastChar = state.equation.trim().slice(-1);
    const lastNumber = state.equation.split(/[-+*÷]/).pop();

    if (lastNumber.includes(".")) return state;
    if (operators.includes(lastChar) || state.equation === "" || state.equation === "0") {
      return { ...state, currentOperand: "0.", equation: (state.equation === "0" ? "" : state.equation) + "0.", result: calculate(state.equation + "0.") };
    }

    return { ...state, currentOperand: (state.currentOperand || "0") + ".", equation: state.equation + ".", result: calculate(state.equation + ".") };
  }

  if (state.overwrite) {
    if (payload.digit !== ".") {
      return { ...state, currentOperand: payload.digit, equation: payload.digit, result: payload.digit, overwrite: false };
    }
    return state;
  }

  if (state.equation === "0") {
    if (payload.digit === ".") return { ...state, currentOperand: "0.", equation: "0.", result: "0." };
    return { ...state, currentOperand: payload.digit, equation: payload.digit, result: payload.digit };
  }

  const newEquation = `${state.equation || ""}${payload.digit}`;
  return { ...state, currentOperand: `${state.currentOperand || ""}${payload.digit}`, equation: newEquation, result: calculate(newEquation) };
}