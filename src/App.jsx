import React, { useState } from 'react';
import './App.css';
import StackOverflowData from './components/StackOverflowData';
import FlightsData from './components/FlightsData';

function App() {
  const [showStackOverflow, setShowStackOverflow] = useState(false);
  const [showFlightsData, setShowFlightsData] = useState(false);

  const handleStackOverflowClick = () => {
    setShowStackOverflow(true);
    setShowFlightsData(false);
  };

  const handleFlightsDataClick = () => {
    setShowStackOverflow(false);
    setShowFlightsData(true);
  };

  return (
    <>
      <div>
        <h1>XALDIGITAL Test</h1>
        <div>
          <button onClick={handleStackOverflowClick}>Show Stack Overflow Data</button>
          <button onClick={handleFlightsDataClick}>Show Flights Data</button>

          {showStackOverflow && <StackOverflowData />}
          {showFlightsData && <FlightsData />}
        </div>
      </div>
    </>
  );
}

export default App;
