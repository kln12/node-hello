import React, { useState } from 'react';

function App() {
  const [voterID, setVoterID] = useState('');

  const handleChange = (e) => {
    setVoterID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Voter ID: ${voterID}`);
  };

  return (
    <div>
      <h1>Voter ID Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Voter ID:
          <input
            type="text"
            value={voterID}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
