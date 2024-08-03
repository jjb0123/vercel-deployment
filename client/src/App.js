import React, { useEffect, useState } from 'react';
import './App.css';
import UserGraph from './UserGraph';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Prepare data for bar chart
        const formattedData = data.users.map(user => ({
          name: user,
          value: Math.floor(Math.random() * 100) // Generate a random value for each user
        }));
        setBackendData(formattedData);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleClick = (name) => {
    alert(`Hello ${name}!`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="data-fetch">
          <h1>Welcome to My App!</h1>
          <p>Fetching data from the backend:</p>
          {error && <p className="error">Error: {error}</p>}
          {!backendData ? (
            <p>Loading...</p>
          ) : (
            <ul className="user-list">
              {backendData.map((user, i) => (
                <li
                  key={i}
                  className="user-item"
                  onClick={() => handleClick(user.name)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="graph">
          {backendData && <UserGraph data={backendData} />}
        </div>
      </header>
    </div>
  );
}

export default App;
