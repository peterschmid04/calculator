export function calculate(expression) {
    const operators = { "+": 1, "-": 1, "*": 2, "÷": 2 };
    const outputQueue = [];
    const operatorStack = [];
    const tokens = expression.match(/-?\d+\.?\d*|[+\-*÷]/g);
    if (!tokens) return "0";
  
    tokens.forEach((token) => {
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
    outputQueue.forEach((token) => {
      if (!isNaN(token)) {
        resultStack.push(token);
      } else {
        const b = resultStack.pop();
        const a = resultStack.pop();
        switch (token) {
          case "+": resultStack.push(a + b); break;
          case "-": resultStack.push(a - b); break;
          case "*": resultStack.push(a * b); break;
          case "÷": resultStack.push(b === 0 ? "Fehler" : a / b); break;
        }
      }
    });
  
    const finalResult = resultStack[0];
    return typeof finalResult === "number" ? parseFloat(finalResult.toFixed(10)) : finalResult;
  }