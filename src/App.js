import { useState } from "react";
import { addDigit } from "./utils/addDigit";
import { chooseOperation } from "./utils/chooseOperation";
import { deleteDigit } from "./utils/deleteDigit";
import { evaluate } from "./utils/evaluate";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

function App() {
  const [calcState, setCalcState] = useState({
    equation: "0",
    currentOperand: null,
    result: "0",
    overwrite: false,
  });


  const handleClear = () => {
    setCalcState((cur) => ({
      equation: "0",
      currentOperand: null,
      result: "0",
      overwrite: false,
    }));
  };

  const handleAddDigit = (digit) => {
    setCalcState((cur) => addDigit(cur, { digit }));
  };

  const handleOperation = (operation) => {
    setCalcState((cur) => chooseOperation(cur, { operation }));
  };
  
  const handleDeleteDigit = () => {
    setCalcState((cur) => deleteDigit(cur, {}));
  };
  
  const handleEvaluate = () => {
    setCalcState((cur) => evaluate(cur, {}));
  };

  return (
    <div>
      <div className="App">Mein Taschenrechner</div>
      <div className="calculator-grid">
        <div className="output">
          <div className="history">{calcState.equation}</div>
          <span className="current-operand">{calcState.result}</span>
        </div>
        <button className="clear" onClick={handleClear}>AC</button>
        <button className="delete" onClick={handleDeleteDigit}>DEL</button>
        <DigitButton digit="(-)" onClick={handleAddDigit} />
        <OperationButton operation="÷" onClick={handleOperation} />
        <OperationButton operation="*" onClick={handleOperation} />
        <DigitButton digit="7" onClick={handleAddDigit} />
        <DigitButton digit="8" onClick={handleAddDigit} />
        <DigitButton digit="9" onClick={handleAddDigit} />
        <OperationButton operation="+" onClick={handleOperation} />
        <OperationButton operation="-" onClick={handleOperation} />
        <DigitButton digit="4" onClick={handleAddDigit} />
        <DigitButton digit="5" onClick={handleAddDigit} />
        <DigitButton digit="6" onClick={handleAddDigit} />
        <DigitButton digit="1" onClick={handleAddDigit} />
        <DigitButton digit="2" onClick={handleAddDigit} />
        <DigitButton digit="3" onClick={handleAddDigit} />
        <DigitButton digit="0" onClick={handleAddDigit} />
        <DigitButton digit="." onClick={handleAddDigit} />
        <button className="equal" onClick={handleEvaluate}>=</button>
      </div>
    </div>
  );
}


export default App;


// function calculate(expression) {
//   // Definieren der Operatoren und ihrer Priorität (1 = niedrig, 2 = hoch)
//   const operators = { "+": 1, "-": 1, "*": 2, "÷": 2 };

//   // Initialisieren der Ausgabewarteschlange (für die Postfix-Notation)
//   const outputQueue = [];

//   // Stapel zur Verwaltung von Operatoren
//   const operatorStack = [];

//   // Tokenisieren des Ausdrucks: Zahlen und Operatoren extrahieren
//   const tokens = expression.match(/-?\d+\.?\d*|[+\-*÷]/g);

//   // Falls keine Tokens gefunden werden, Rückgabe von "0"
//   if (!tokens) return "0";

//   // Iteration über jedes Token im Ausdruck
//   tokens.forEach((token) => {
//     if (!isNaN(token)) {
//       // Wenn das Token eine Zahl ist
//       outputQueue.push(parseFloat(token)); // In die Ausgabewarteschlange einfügen
//     } else if (operators[token]) {
//       // Wenn das Token ein Operator ist
//       // Vergleich der Priorität des aktuellen Operators mit dem letzten im Stapel
//       while (
//         operatorStack.length &&
//         operators[operatorStack[operatorStack.length - 1]] >= operators[token]
//       ) {
//         outputQueue.push(operatorStack.pop()); // Operator mit höherer/gleicher Priorität in die Ausgabewarteschlange verschieben
//       }
//       operatorStack.push(token); // Aktuellen Operator auf den Stapel legen
//     }
//   });

//   // Alle verbleibenden Operatoren vom Stapel in die Ausgabewarteschlange verschieben
//   while (operatorStack.length) {
//     outputQueue.push(operatorStack.pop());
//   }

//   // Stapel zur Berechnung des Ergebnisses aus der Postfix-Notation
//   const resultStack = [];

//   outputQueue.forEach((token) => {
//     if (!isNaN(token)) {
//       // Wenn das Token eine Zahl ist
//       resultStack.push(token); // Zahl auf den Stapel legen
//     } else {
//       // Wenn das Token ein Operator ist
//       const b = resultStack.pop(); // Zweiter Operand
//       const a = resultStack.pop(); // Erster Operand

//       // Berechnung basierend auf dem Operator
//       switch (token) {
//         case "+":
//           resultStack.push(a + b);
//           break;
//         case "-":
//           resultStack.push(a - b);
//           break;
//         case "*":
//           resultStack.push(a * b);
//           break;
//         case "÷":
//           if (b === 0) {
//             resultStack.push("Fehler"); // Fehlerbehandlung für Division durch null
//           } else {
//             resultStack.push(a / b); // Division durchführen
//           }
//           break;
//         default:
//           break;
//       }
//     }
//   });

//   // Rundung des Ergebnisses auf 10 Nachkommastellen, um Floating-Point-Fehler zu vermeiden
//   const finalResult = resultStack[0];

//   return typeof finalResult === "number"
//     ? parseFloat(finalResult.toFixed(10)) // Konvertierung zu einer sauberen Zahl
//     : finalResult; // Falls ein Fehler (z.B. Division durch null), wird dieser direkt zurückgegeben
// }

// const addDigit = (state, payload) => {
//   if (payload.digit === "(-)") {
//     const lastNumberMatch = state.equation.match(/-?\d+\.?\d*$/);
//     if (!lastNumberMatch) return state; // Keine Zahl gefunden
//     const lastNumber = lastNumberMatch[0];

//     // Verhindern, dass 0 oder -0 negativ werden
//     if (parseFloat(lastNumber) === 0 && !lastNumber.includes(".")) {
//       return state; // Keine Änderung, wenn es genau "0" ist
//     }
//     const newNumber = (parseFloat(lastNumber) * -1).toString(); // Vorzeichen umkehren
//     const newEquation = state.equation.replace(/-?\d+\.?\d*$/, newNumber);
//     return {
//       ...state,
//       currentOperand: newNumber,
//       equation: newEquation,
//       result: calculate(newEquation),
//     };
//   }

//   if (payload.digit === ".") {
//     const operators = ["+", "-", "*", "÷"];
//     const lastChar = state.equation.trim().slice(-1); // Holt nur das letzte Zeichen der Gleichung
//     const lastNumber = state.equation.split(/[-+*÷]/).pop(); // Letzte Zahl nach einem Operator

//     //  Verhindern von doppelten Dezimalpunkten
//     if (lastNumber.includes(".")) {
//       return state; // Kein zweiter Dezimalpunkt in derselben Zahl
//     }

//     //  Nach einem Operator oder am Anfang → füge "0." hinzu
//     if (
//       operators.includes(lastChar) ||
//       state.equation === "" ||
//       state.equation === "0"
//     ) {
//       return {
//         ...state,
//         currentOperand: "0.",
//         equation: (state.equation === "0" ? "" : state.equation) + "0.",
//         result: calculate(state.equation + "0."),
//       };
//     }

//     //  Normales Hinzufügen des Dezimalpunkts
//     return {
//       ...state,
//       currentOperand: (state.currentOperand || "0") + ".",
//       equation: state.equation + ".",
//       result: calculate(state.equation + "."),
//     };
//   }

//   // Überschreiben des aktuellen Operanden nach einer Berechnung
//   if (state.overwrite) {
//     if (payload.digit !== ".") {
//       return {
//         ...state,
//         currentOperand: payload.digit,
//         equation: payload.digit,
//         result: payload.digit,
//         overwrite: false,
//       };
//     } else {
//       return state;
//     }
//   }

//   // Verhindert führende Nullen
//   if (state.equation === "0") {
//     if (payload.digit === ".") {
//       return {
//         ...state,
//         currentOperand: "0.",
//         equation: "0.",
//         result: "0.",
//       };
//     }

//     return {
//       ...state,
//       currentOperand: payload.digit,
//       equation: payload.digit,
//       result: payload.digit,
//     };
//   }

//   // Neue Gleichung erstellen
//   const newEquation = `${state.equation || ""}${payload.digit}`;

//   return {
//     ...state,
//     currentOperand: `${state.currentOperand || ""}${payload.digit}`,
//     equation: newEquation,
//     result: calculate(newEquation),
//   };
// };

// const chooseOperation = (state, payload) => {
//   if (state.currentOperand == null && state.equation === "") {
//     return state;
//   }
//   if (state.overwrite) {
//     return {
//       ...state,
//       equation: `${state.result} ${payload.operation} `,
//       currentOperand: null,
//       overwrite: false,
//     };
//   }
//   // Ersetzen des letzten Operators, falls bereits einer vorhanden ist
//   if (/[-+*÷] ?$/.test(state.equation)) {
//     return {
//       ...state,
//       equation: state.equation.replace(
//         /[-+*÷] ?$/,
//         payload.operation + " "
//       ),
//     };
//   }
//   return {
//     ...state,
//     operation: payload.operation,
//     equation: `${state.equation} ${payload.operation} `,
//   };
// }

// const deleteDigit = (state, payload) => {
//   if (state.overwrite) {
//     return {
//       ...state,
//       overwrite: false,
//       currentOperand: null,
//       equation: "",
//       result: "",
//     };
//   }
//   if (state.currentOperand === null) return state;
//   const trimmedEquation = state.equation.slice(0, -1);
//   return {
//     ...state,
//     currentOperand: state.currentOperand.slice(0, -1),
//     equation: trimmedEquation,
//     result: calculate(trimmedEquation),
//   };

// }

// const evaluate =(state, payload) => {
//   if (/[+\-*÷]$/.test(state.equation) || state.equation === "") {
//     return state;
//   }

//   // Verhindern der doppelten Berechnung, falls bereits berechnet wurde
//   if (state.overwrite) {
//     return state;
//   }

//   const evaluatedResult = calculate(state.equation);
//   return {
//     ...state,
//     overwrite: true,
//     equation: `${state.equation} = ${evaluatedResult}`,
//     currentOperand: evaluatedResult,
//     result: evaluatedResult,
//   };
// }