import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleGenerate = () => {
    if (selectedOption) {
      navigate(`/${selectedOption}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Interface Generator</h1>
      <div className="option-container">
        <label>
          <input
            type="radio"
            value="workflow"
            checked={selectedOption === 'workflow'}
            onChange={handleOptionChange}
          />
          Workflow
        </label>
        <label>
          <input
            type="radio"
            value="chat"
            checked={selectedOption === 'chat'}
            onChange={handleOptionChange}
          />
          Chat
        </label>
      </div>
      <button onClick={handleGenerate} className="generate-button" disabled={!selectedOption}>
        Generate
      </button>
    </div>
  );
}

export default Home;