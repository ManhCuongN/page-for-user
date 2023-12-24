import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

const SimpleForm = () => {
  const [steps, setSteps] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Fetch initial steps from an API endpoint when the component mounts
    fetchSteps('initial'); // Replace 'initial' with the appropriate key or identifier
  }, []);

  const fetchSteps = async (userQuery) => {
    try {
      // Make an API request to get steps based on user input
      const response = await fetch(`your_api_endpoint?query=${userQuery}`);
      const data = await response.json();

      // Update the steps based on the API response
      setSteps(data.steps);
    } catch (error) {
      console.error('Error fetching steps:', error);
    }
  };

  const handleUserInput = (value) => {
    setUserInput(value);
    fetchSteps(value);
  };

  return (
    <div className="App">
      <ChatBot
        headerTitle="GeekBot"
        steps={steps}
        userSteps={[
          {
            id: 'getUserInput',
            user: true,
            trigger: () => {
              return userInput ? 'showUserInput' : 'getUserInput';
            },
          },
          {
            id: 'showUserInput',
            message: `You typed: ${userInput}`,
            trigger: 'getUserInput',
          },
        ]}
      />
    </div>
  );
};

export default SimpleForm;
