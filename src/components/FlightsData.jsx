import React, { useEffect, useState } from 'react';
import { get } from '../services/authService'; // Import your get function

const FlightsData = () => {
  const [flights, setFlights] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers([]);

    // Fetch data for flights
    get('/flights/fetch-flights')
      .then((response) => {
        setFlights(response.data.flights);
      })
      .catch((error) => {
        console.error('Error fetching flights data:', error);
      });

    // Define an asynchronous function to fetch answers
    const fetchAnswers = async () => {
      try {
        const responses = await Promise.all([
          get('/flights/airport-with-most-movements'),
          get('/flights/airline-with-most-flights'),
          get('/flights/day-with-most-flights'),
          get('/flights/airlines-with-more-than-2-flights-per-day')
        ]);

        // Create a new array for answers, processing each response
        const newAnswers = [
          {
            question: '¿Cuál es el nombre aeropuerto que ha tenido mayor movimiento durante el año?',
            answer: responses[0].data.airportWithMostMovements.nombre_aeropuerto
          },
          {
            question: '¿Cuál es el nombre aerolínea que ha realizado mayor número de vuelos durante el año?',
            answer: responses[1].data.airlineWithMostFlights.nombre_aerolinea
          },
          {
            question: '¿En qué día se han tenido mayor número de vuelos?',
            answer: responses[2].data.dayWithMostFlights.dia
          },
          // Last question with conditional answer
          {
            question: '¿Cuáles son las aerolíneas que tienen más de 2 vuelos por día?',
            answer: responses[3].data.airlinesWithMoreThan2FlightsPerDay.length === 0
              ? 'Ninguna aerolínea tiene más de 2 vuelos por día'
              : [...new Set(responses[3].data.airlinesWithMoreThan2FlightsPerDay.map(row => row.nombre_aerolinea))].join(', ')
          }
        ];

        setAnswers(newAnswers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
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

      {/* Answers Table */}
      <div>
        <h3>Answers to Questions</h3>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr key={`answer-${index}`}>
                <td>{answer.question}</td>
                <td>{answer.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsData;