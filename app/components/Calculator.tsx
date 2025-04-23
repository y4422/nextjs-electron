'use client';

import { useState } from 'react';
import React from 'react';

export default function Calculator(): React.ReactElement {
    const [display, setDisplay] = useState<string>('0');
    const [operator, setOperator] = useState<string | null>(null);
    const [firstValue, setFirstValue] = useState<number | null>(null);
    const [waitingForSecondValue, setWaitingForSecondValue] = useState<boolean>(false);

    const inputDigit = (digit: number): void => {
        if (waitingForSecondValue) {
            setDisplay(String(digit));
            setWaitingForSecondValue(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = (): void => {
        if (waitingForSecondValue) {
            setDisplay('0.');
            setWaitingForSecondValue(false);
            return;
        }

        if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clearDisplay = (): void => {
        setDisplay('0');
        setOperator(null);
        setFirstValue(null);
        setWaitingForSecondValue(false);
    };

    const handleOperator = (nextOperator: string): void => {
        const inputValue = parseFloat(display);

        if (firstValue === null) {
            setFirstValue(inputValue);
        } else if (operator) {
            const result = calculate(firstValue, inputValue, operator);
            setDisplay(String(result));
            setFirstValue(result);
        }

        setWaitingForSecondValue(true);
        setOperator(nextOperator);
    };

    const calculate = (firstValue: number, secondValue: number, operator: string): number => {
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    };

    const performCalculation = (): void => {
        if (firstValue === null || operator === null) {
            return;
        }

        const inputValue = parseFloat(display);
        const result = calculate(firstValue, inputValue, operator);
        setDisplay(String(result));
        setFirstValue(null);
        setOperator(null);
        setWaitingForSecondValue(false);
    };

    // ボタンスタイル
    const baseButtonStyle = "h-14 rounded-full text-xl font-medium transition-colors";
    const numberButton = `${baseButtonStyle} bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white`;
    const operatorButton = `${baseButtonStyle} bg-amber-500 hover:bg-amber-400 active:bg-amber-300 text-white`;
    const functionButton = `${baseButtonStyle} bg-gray-400 hover:bg-gray-300 active:bg-gray-200 text-black`;

    return (
        <div className="w-72 bg-black rounded-2xl p-5 shadow-xl">
            <div className="bg-gray-800 text-white text-right p-4 mb-5 rounded text-3xl overflow-hidden text-ellipsis whitespace-nowrap">
                {display}
            </div>
            <div className="grid grid-cols-4 gap-3">
                <button onClick={clearDisplay} className={functionButton}>C</button>
                <button onClick={() => setDisplay(String(parseFloat(display) * -1))} className={functionButton}>+/-</button>
                <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className={functionButton}>%</button>
                <button onClick={() => handleOperator('/')} className={operatorButton}>÷</button>

                <button onClick={() => inputDigit(7)} className={numberButton}>7</button>
                <button onClick={() => inputDigit(8)} className={numberButton}>8</button>
                <button onClick={() => inputDigit(9)} className={numberButton}>9</button>
                <button onClick={() => handleOperator('*')} className={operatorButton}>×</button>

                <button onClick={() => inputDigit(4)} className={numberButton}>4</button>
                <button onClick={() => inputDigit(5)} className={numberButton}>5</button>
                <button onClick={() => inputDigit(6)} className={numberButton}>6</button>
                <button onClick={() => handleOperator('-')} className={operatorButton}>-</button>

                <button onClick={() => inputDigit(1)} className={numberButton}>1</button>
                <button onClick={() => inputDigit(2)} className={numberButton}>2</button>
                <button onClick={() => inputDigit(3)} className={numberButton}>3</button>
                <button onClick={() => handleOperator('+')} className={operatorButton}>+</button>

                <button onClick={() => inputDigit(0)} className={`${numberButton} col-span-2 text-left pl-6 rounded-full`}>0</button>
                <button onClick={inputDecimal} className={numberButton}>.</button>
                <button onClick={performCalculation} className={operatorButton}>=</button>
            </div>
        </div>
    );
} 