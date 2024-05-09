import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    setOutput((prevOutput) => prevOutput + `<h3>User:</h3><p>${userInput}</p><h3>Chatbot:</h3>`);

    try {
      const response = await fetch('http://127.0.0.1:3000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.status === 200) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setOutput((prevOutput) => prevOutput + chunk);
        }
      } else {
        setOutput((prevOutput) => prevOutput + 'An error occurred during chatbot processing.<br>');
      }
    } catch (error) {
      console.error(error);
    }

    setUserInput('');
  };

  return (
    <div className="App">
      <h1 className="banner">Ink Nyto Bot</h1>
      <section>
        <img src="12125.jpg" alt="" />
        <div dangerouslySetInnerHTML={{ __html: output }} />
        <div className="input">
          <textarea
            id="userInput"
            name="story"
            rows="5"
            cols="110"
            value={userInput}
            onChange={handleInputChange}
            placeholder="It was a dark and stormy night..."
          />
          <button className="button-28" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
