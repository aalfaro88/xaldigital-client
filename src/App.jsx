import React, { useState, useEffect } from 'react';
import { get } from './services/authService';
import './App.css'

function App() {
  const [data, setData] = useState(null); 

  useEffect(() => {
    
    fetchData();
  }, []);
const fetchData = async () => {
  try {
    console.log('Fetching data...'); 
    const response = await get('/api/fetch-stackoverflow'); 
    console.log('Data received:', response.data); 
    setData(response.data); 
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

  return (
    <>
      <div>
        <h1>XALDIGITAL Test</h1>
        <button onClick={fetchData}>Obtener Datos</button> 
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
