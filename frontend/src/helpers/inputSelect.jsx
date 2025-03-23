import React, { useState } from 'react';

function InputSelect() {
  // Initial options array
  const options = ["Yes", "No", "May be"];
  
  // State to track the input value
  const [inputValue, setInputValue] = useState('');
  
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Filter options based on input value
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle select change
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search options..."
        style={{ width: '200px', marginBottom: '10px' }}
      />
      
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        style={{ width: '200px' }}
      >
        <option value="">Select an option</option>
        {filteredOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
