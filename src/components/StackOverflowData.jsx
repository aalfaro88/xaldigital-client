import React, { useState, useEffect, useRef } from 'react';
import { get } from '../services/authService';
import Chart from 'chart.js/auto';
import './StackOverflowData.css';

const StackOverflowData = () => {
  const [data, setData] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [highestReputationAnswer, setHighestReputationAnswer] = useState(null);
  const [lowestViewCountAnswer, setLowestViewCountAnswer] = useState(null);
  const [oldestAnswer, setOldestAnswer] = useState(null);
  const [newestAnswer, setNewestAnswer] = useState(null);
  const pieChartRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('Insights'); // 'Insights' is the default selected option
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pieChartRef.current) {
      // Create or update the Pie chart
      const pieChart = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels: ['Answered', 'Unanswered'],
          datasets: [
            {
              data: [answeredCount, unansweredCount],
              backgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 16,
                },
              },
            },
            tooltip: {
              bodyFont: {
                size: 16,
              },
            },
          },
        },
      });

      return () => {
        // Cleanup the chart on unmount
        pieChart.destroy();
      };
    }
  }, [answeredCount, unansweredCount]);

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

      console.log("Number of Answered Calls:", answeredCount);
      console.log("Number of Unanswered Calls:", unansweredCount);
      console.log("Answer with the Highest Reputation:", highestReputationAnswer);
      console.log("Answer with the Lowest View Count:", lowestViewCountAnswer);
      console.log("Oldest Answer:", oldestAnswer);
      console.log("Newest Answer:", newestAnswer);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 500) {
        setError("Exceeded API call limit (500 error). Please try again later.");
      }
    }
  };

  const handleInsightsClick = () => {
    setSelectedOption('Insights');
    if (pieChartRef.current) {
      pieChartRef.current.innerHTML = '';
    }
    // Clear the error message when switching to Insights
    setError(null);
  };

  const handleTableClick = () => {
    setSelectedOption('Table');
  };

  return (
    <div>
      <h2>Stack Overflow Data</h2>
      <div>
        <button onClick={handleInsightsClick} className={selectedOption === 'Insights' ? 'active' : ''}>
          Insights
        </button>
        <button onClick={handleTableClick} className={selectedOption === 'Table' ? 'active' : ''}>
          Table
        </button>
      </div>

      {error ? ( // Display error message if there's an error
        <div className="error-message">{error}</div>
      ) : (
        selectedOption === 'Insights' ? (
          <div className='answer-container'>
            <table className="answer-table">
              <tbody>
                <tr>
                  <td>Number of Unanswered Calls:</td>
                  <td>
                    <div className='pie-chart-container'>
                      <canvas ref={pieChartRef}></canvas>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Question with the Highest Reputation:</td>
                  <td>{highestReputationAnswer && highestReputationAnswer.title}</td>
                </tr>
                <tr>
                  <td>Newest Answer:</td>
                  <td>{newestAnswer && newestAnswer.title}</td>
                </tr>
                <tr>
                  <td>Oldest Answer:</td>
                  <td>{oldestAnswer && oldestAnswer.title}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
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
        )
      )}
    </div>
  );
};

export default StackOverflowData;
