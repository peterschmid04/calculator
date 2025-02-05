import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const initialState = {
  equation: "0",
  currentOperand: null,
  result: "0",
  overwrite: false,
};

function calculate(expression) {
  const operators = { '+': 1, '-': 1, '*': 2, '÷': 2 };
  const outputQueue = [];
  const operatorStack = [];
  const tokens = expression.match(/-?\d+\.?\d*|[+\-*÷]/g);

  if (!tokens) return "0";

  tokens.forEach(token => {
    if (!isNaN(token)) {
      outputQueue.push(parseFloat(token));
    } else if (operators[token]) {
      while (
        operatorStack.length &&
        operators[operatorStack[operatorStack.length - 1]] >= operators[token]
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  });

  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop());
  }

  const resultStack = [];
  outputQueue.forEach(token => {
    if (!isNaN(token)) {
      resultStack.push(token);
    } else {
      const b = resultStack.pop();
      const a = resultStack.pop();
      switch (token) {
        case '+': resultStack.push(a + b); break;
        case '-': resultStack.push(a - b); break;
        case '*': resultStack.push(a * b); break;
        case '÷':
          if (b === 0){
            resultStack.push("Fehler");
          } else {
            resultStack.push(a / b);
          } break; 
        default: break;
      }
    }
  });

  return resultStack[0] || "0";
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
  if (payload.digit === "(-)") {
    const lastNumberMatch = state.equation.match(/-?\d+\.?\d*$/);
    if (!lastNumberMatch) return state; // Keine Zahl gefunden

    const lastNumber = lastNumberMatch[0];

    // Verhindern, dass 0 oder -0 negativ werden
    if (parseFloat(lastNumber) === 0 && !lastNumber.includes(".")) {
      return state; // Keine Änderung, wenn es genau "0" ist
    }

    const newNumber = (parseFloat(lastNumber) * -1).toString(); // Vorzeichen umkehren
    const newEquation = state.equation.replace(/-?\d+\.?\d*$/, newNumber);

    return {
      ...state,
      currentOperand: newNumber,
      equation: newEquation,
      result: calculate(newEquation),
    };
  }

  if (payload.digit === ".") {
    // Überprüfen, ob die aktuelle Zahl bereits eine Dezimalstelle enthält
    const lastNumber = state.equation.split(/[-+*÷]/).pop();
    if (lastNumber.includes(".")) {
      return state; // Keine Änderung, wenn bereits eine Dezimalstelle vorhanden ist
    }

    // Wenn die Gleichung leer ist oder mit einem Operator endet, füge "0." hinzu
    if (/[-+*÷ ]?$/.test(state.equation)) {
      return {
        ...state,
        currentOperand: "0.",
        equation: state.equation + "0.",
        result: calculate(state.equation + "0."),
      };
    }

    // Füge die Dezimalstelle zur aktuellen Zahl hinzu
    return {
      ...state,
      currentOperand: state.currentOperand + ".",
      equation: state.equation + ".",
      result: calculate(state.equation + "."),
    };
  }

  // Überschreiben des aktuellen Operanden nach einer Berechnung
  if (state.overwrite) {
    if (payload.digit !== ".") {
      return {
        ...state,
        currentOperand: payload.digit,
        equation: payload.digit,
        result: payload.digit,
        overwrite: false,
      };
    } else {
      return state;
    }
  }

  // Verhindert führende Nullen
  if (state.equation === "0") {
    if (payload.digit === ".") {
      return {
        ...state,
        currentOperand: "0.",
        equation: "0.",
        result: "0.",
      };
    }

    return {
      ...state,
      currentOperand: payload.digit,
      equation: payload.digit,
      result: payload.digit,
    };
  }

  // Neue Gleichung erstellen
  const newEquation = `${state.equation || ""}${payload.digit}`;

  return {
    ...state,
    currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    equation: newEquation,
    result: calculate(newEquation),
  };
      
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.equation === "") {
        return state;
      }
      if (state.overwrite) {
        return {
          ...state,
          equation: `${state.result} ${payload.operation} `,
          currentOperand: null,
          overwrite: false,
        };
      }
      // Ersetzen des letzten Operators, falls bereits einer vorhanden ist
      if (/[-+*÷] ?$/.test(state.equation)) {
        return {
          ...state,
          equation: state.equation.replace(/[-+*÷] ?$/, payload.operation + ' '),
        };
      }
      return {
        ...state,
        operation: payload.operation,
        equation: `${state.equation} ${payload.operation} `,
      };
    
    case ACTIONS.CLEAR:
      return initialState;
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
          equation: "",
          result: "",
        };
      }
      if (state.currentOperand === null) return state;
      const trimmedEquation = state.equation.slice(0, -1);
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
        equation: trimmedEquation,
        result: calculate(trimmedEquation),
      };
    
    case ACTIONS.EVALUATE:      
      if (/[+\-*÷]$/.test(state.equation) || state.equation === "") {
        return state;
      }

      // Verhindern der doppelten Berechnung, falls bereits berechnet wurde
      if (state.overwrite) {
        return state;
      }

      const evaluatedResult = calculate(state.equation);
      return {
        ...state,
        overwrite: true,
        equation: `${state.equation} = ${evaluatedResult}`,
        currentOperand: evaluatedResult,
        result: evaluatedResult,
      };
    
    default:
      return state;
  }
}

function App() {
  const [{ equation, result }, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div className="App">Mein Taschenrechner</div>
      <div className="calculator-grid">
        <div className="output">
          <div className="history">{equation}</div>
          <span className="current-operand">{result}</span>
        </div>
        <button className="span-two clear" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button className="delete" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="(-)" dispatch={dispatch} />
        <button className="equal" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
    </div>
  );
}

export default App; 

