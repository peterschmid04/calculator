import React from "react";

export default function DigitButton({ onClick, digit }) {
  return (
    <button className="digit-button" onClick={() => onClick(digit)}>
      {digit}
    </button>
  );
}