export function chooseOperation(state, payload) {
    if (state.currentOperand == null && state.equation === "") return state;
  
    if (state.overwrite) {
      return { ...state, equation: `${state.result} ${payload.operation} `, currentOperand: null, overwrite: false };
    }
  
    if (/[-+*÷] ?$/.test(state.equation)) {
      return { ...state, equation: state.equation.replace(/[-+*÷] ?$/, payload.operation + " ") };
    }
  
    return { ...state, operation: payload.operation, equation: `${state.equation} ${payload.operation} ` };
  }