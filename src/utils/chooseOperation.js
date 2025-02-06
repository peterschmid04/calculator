/**
 *
 * @param {State} state
 * @param {string} operation
 * @returns {State}
 */
export function chooseOperation(state, operation) {
  if (state.currentOperand == null && state.equation === "") return state;

  if (state.overwrite) {
    return {
      ...state,
      equation: `${state.result} ${operation} `,
      currentOperand: null,
      overwrite: false,
    };
  }

  if (/[-+*÷] ?$/.test(state.equation)) {
    return {
      ...state,
      equation: state.equation.replace(/[-+*÷] ?$/, operation + " "),
    };
  }

  return {
    ...state,

    equation: `${state.equation} ${operation} `,
  };
}
