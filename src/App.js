import React, { useState } from 'react';
import Calculator from './Calculator';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [calculationLog, setCalculationLog] = useState(() => {
    const savedLog = localStorage.getItem('calculatorLog');
    return savedLog ? JSON.parse(savedLog) : [];
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLog = () => {
    setShowLog(!showLog);
  };

  const clearLog = () => {
    setCalculationLog([]);
    localStorage.removeItem('calculatorLog');
  };

  const addToLog = (calculation, result) => {
    const logEntry = {
      id: Date.now(),
      calculation: calculation,
      result: result,
      timestamp: new Date().toLocaleString()
    };
    const newLog = [logEntry, ...calculationLog].slice(0, 50);
    setCalculationLog(newLog);
    localStorage.setItem('calculatorLog', JSON.stringify(newLog));
  };

  return (
    <div className="App">
      <header className={`App-header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="header-top">
          <h1>Calculator App</h1>
          <div className="header-buttons">
            <div className="log-button-container">
              <button className="log-toggle-btn" onClick={toggleLog}>
                📋 {showLog ? 'Hide Log' : 'Show Log'}
              </button>
              {showLog && (
                <div className="calculation-log-dropdown">
                  <div className="log-header">
                    <h3>Calculation History</h3>
                    <button className="btn-clear-log" onClick={clearLog}>Clear All</button>
                  </div>
                  <div className="log-entries">
                    {calculationLog.length === 0 ? (
                      <p className="no-entries">No calculations yet</p>
                    ) : (
                      calculationLog.map((entry) => (
                        <div key={entry.id} className="log-entry">
                          <div className="calculation">{entry.calculation} = {entry.result}</div>
                          <div className="timestamp">{entry.timestamp}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <Calculator isDarkMode={isDarkMode} addToLog={addToLog} />
      </header>
    </div>
  );
}

export default App;
