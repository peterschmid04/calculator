import React from "react";

export default function OperationButton({ onClick, operation }) {
  return (
    <button 
      className="operation"
      data-operation={operation}
      onClick={() => onClick(operation)}
    >
      {operation}
    </button>
  );
}