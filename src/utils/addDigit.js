import { calculate } from "./calculate.js";

/**
 *
 * @param {State} state
 * @param {string} digit
 * @returns {State}
 */
export function addDigit(state, digit) {
  if (digit === "(-)") {
    const lastNumberMatch = state.equation.match(/-?\d+\.?\d*$/);
    if (!lastNumberMatch) return state;
    const lastNumber = lastNumberMatch[0];

    if (parseFloat(lastNumber) === 0 && !lastNumber.includes(".")) return state;

    const newNumber = (parseFloat(lastNumber) * -1).toString();
    const newEquation = state.equation.replace(/-?\d+\.?\d*$/, newNumber);
    return {
      ...state,
      currentOperand: newNumber,
      equation: newEquation,
      result: calculate(newEquation),
    };
  }

  if (digit === ".") {
    const operators = ["+", "-", "*", "÷"];
    const lastChar = state.equation.trim().slice(-1);
    const lastNumber = state.equation.split(/[-+*÷]/).pop();

    if (lastNumber.includes(".")) return state;
    if (
      operators.includes(lastChar) ||
      state.equation === "" ||
      state.equation === "0"
    ) {
      return {
        ...state,
        currentOperand: "0.",
        equation: (state.equation === "0" ? "" : state.equation) + "0.",
        result: calculate(state.equation + "0."),
      };
    }

    return {
      ...state,
      currentOperand: (state.currentOperand || "0") + ".",
      equation: state.equation + ".",
      result: calculate(state.equation + "."),
    };
  }

  if (state.overwrite) {
    if (digit !== ".") {
      return {
        ...state,
        currentOperand: digit,
        equation: digit,
        result: digit,
        overwrite: false,
      };
    }
    return state;
  }

  if (state.equation === "0") {
    if (digit === ".")
      return { ...state, currentOperand: "0.", equation: "0.", result: "0." };
    return { ...state, currentOperand: digit, equation: digit, result: digit };
  }

  const newEquation = `${state.equation || ""}${digit}`;
  return {
    ...state,
    currentOperand: `${state.currentOperand || ""}${digit}`,
    equation: newEquation,
    result: calculate(newEquation),
  };
}
