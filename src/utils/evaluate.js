import { calculate } from "./calculate.js";

/**
 * @param {State} state
 * @returns {State}
 */
export function evaluate(state) {
  if (/[+\-*÷]$/.test(state.equation) || state.equation === "") return state;
  if (state.overwrite) return state;

  const evaluatedResult = calculate(state.equation);
  return {
    ...state,
    overwrite: true,
    equation: `${state.equation} = ${evaluatedResult}`,
    currentOperand: evaluatedResult,
    result: evaluatedResult,
  };
}
