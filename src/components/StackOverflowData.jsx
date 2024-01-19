import React, { useState, useEffect } from 'react';
import { get } from '../services/authService';
import { Pie } from 'react-chartjs-2'; 
import './StackOverflowData.css';

const StackOverflowData = () => {
  const [data, setData] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [highestReputationAnswer, setHighestReputationAnswer] = useState(null);
  const [lowestViewCountAnswer, setLowestViewCountAnswer] = useState(null);
  const [oldestAnswer, setOldestAnswer] = useState(null);
  const [newestAnswer, setNewestAnswer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await get('/api/fetch-stackoverflow');
      setData(response.data);

      // Calculate answers
      const items = response.data.data.items;
      let answeredCount = 0;
      let unansweredCount = 0;
      let highestReputationAnswer = null;
      let lowestViewCountAnswer = null;
      let oldestAnswer = null;
      let newestAnswer = null;

      items.forEach(item => {
        if (item.is_answered) {
          answeredCount++;
        } else {
          unansweredCount++;
        }

        if (!highestReputationAnswer || item.score > highestReputationAnswer.score) {
          highestReputationAnswer = item;
        }

        if (!lowestViewCountAnswer || item.view_count < lowestViewCountAnswer.view_count) {
          lowestViewCountAnswer = item;
        }

        if (!oldestAnswer || item.creation_date < oldestAnswer.creation_date) {
          oldestAnswer = item;
        }

        if (!newestAnswer || item.creation_date > newestAnswer.creation_date) {
          newestAnswer = item;
        }
      });

      setAnsweredCount(answeredCount);
      setUnansweredCount(unansweredCount);
      setHighestReputationAnswer(highestReputationAnswer);
      setLowestViewCountAnswer(lowestViewCountAnswer);
      setOldestAnswer(oldestAnswer);
      setNewestAnswer(newestAnswer);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Stack Overflow Data</h2>

      {/* Display answers */}
      <div className='answers'>
        <p>Número de respuestas contestadas: {answeredCount}</p>
        <p>Número de respuestas no contestadas: {unansweredCount}</p>
        {highestReputationAnswer && (
          <p>Respuesta con mayor reputación: {highestReputationAnswer.title}</p>
        )}
        {lowestViewCountAnswer && (
          <p>Respuesta con menor número de vistas: {lowestViewCountAnswer.title}</p>
        )}
        {oldestAnswer && (
          <p>Respuesta más vieja: {oldestAnswer.title}</p>
        )}
        {newestAnswer && (
          <p>Respuesta más actual: {newestAnswer.title}</p>
        )}
      </div>

      {/* Display the table */}
      <div className='table-container'>
        {data && data.data && data.data.items ? (
          <table className="stackoverflow-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Owner</th>
                <th>Is Answered</th>
                <th>View Count</th>
                <th>Score</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {data.data.items.map(item => (
                <tr key={item.question_id}>
                  <td>{item.title}</td>
                  <td>{item.tags.join(', ')}</td>
                  <td>{item.owner.display_name}</td>
                  <td>{item.is_answered ? 'Yes' : 'No'}</td>
                  <td>{item.view_count}</td>
                  <td>{item.score}</td>
                  <td><a href={item.link} target="_blank" rel="noopener noreferrer">View Question</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default StackOverflowData;
