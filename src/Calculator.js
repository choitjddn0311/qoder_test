import React, { useState } from 'react';
import './Calculator.css';

const Calculator = ({ isDarkMode, addToLog }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const calculationString = `${previousValue} ${operation} ${inputValue}`;
      addToLog(calculationString, newValue);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className={`calculator ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="calculator-display">
        <div className="display-value">{display}</div>
      </div>
      
      <div className="calculator-buttons">
        <button className="btn btn-clear" onClick={clear}>C</button>
        <button className="btn btn-delete" onClick={deleteLastDigit}>⌫</button>
        <button className="btn btn-operator" onClick={() => performOperation('÷')}>÷</button>
        <button className="btn btn-operator" onClick={() => performOperation('×')}>×</button>
        
        <button className="btn btn-number" onClick={() => inputNumber(7)}>7</button>
        <button className="btn btn-number" onClick={() => inputNumber(8)}>8</button>
        <button className="btn btn-number" onClick={() => inputNumber(9)}>9</button>
        <button className="btn btn-operator" onClick={() => performOperation('-')}>-</button>
        
        <button className="btn btn-number" onClick={() => inputNumber(4)}>4</button>
        <button className="btn btn-number" onClick={() => inputNumber(5)}>5</button>
        <button className="btn btn-number" onClick={() => inputNumber(6)}>6</button>
        <button className="btn btn-operator" onClick={() => performOperation('+')}>+</button>
        
        <button className="btn btn-number" onClick={() => inputNumber(1)}>1</button>
        <button className="btn btn-number" onClick={() => inputNumber(2)}>2</button>
        <button className="btn btn-number" onClick={() => inputNumber(3)}>3</button>
        <button className="btn btn-equal" onClick={handleEqual}>=</button>
        
        <button className="btn btn-number btn-zero" onClick={() => inputNumber(0)}>0</button>
        <button className="btn btn-decimal" onClick={inputDecimal}>.</button>
      </div>
    </div>
  );
};

export default Calculator;