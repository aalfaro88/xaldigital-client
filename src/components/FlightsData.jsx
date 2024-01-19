import React, { useEffect, useState } from 'react';
import { get } from '../services/authService'; // Import your get function

const FlightsData = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Fetch data for flights
    get('/flights/fetch-flights')
      .then((response) => {
        setFlights(response.data.flights);
      })
      .catch((error) => {
        console.error('Error fetching flights data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Flights Data</h2>
      
      {/* Flights Table */}
      <div>
        <h3>Flights</h3>
        <table>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Airport</th>
              <th>Movement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {flights.map((flight, index) => (
            <tr key={`${flight.id_aerolinea}-${flight.id_aeropuerto}-${flight.id_movimiento}-${index}`}>
                <td>{flight.nombre_aerolinea}</td>
                <td>{flight.nombre_aeropuerto}</td>
                <td>{flight.descripcion}</td>
                <td>{flight.dia}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsData;
