import React, { useState } from 'react';

const BingMapsAutosuggest = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 3) {
      // Make a request to Bing Maps Autosuggest API
      // Update 'suggestions' state with the retrieved suggestions
      // You can use fetch or any HTTP library to make the request
      // Example:
      let response;
      try{
        response = await fetch(`https://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=Av6hw1fyVQ3SIMZw_e8r_faDqFgStW8rE_d_CtJAQJKqAFsh_6g_LnY7GM38cEx4&maxResults=4&includeEntityTypes=Address`);
        if (!response.ok)
        throw new Error(`Network response was not ok (${response.status})`);
      
      else
        console.log(1);

      const suggestion = await response.json();

      let allSuggestions= suggestion.resourceSets[0].resources[0].value;
      let addresses = []
      for (let i = 0; i < allSuggestions.length; i++){
        addresses.push(allSuggestions[i].address.formattedAddress);
      }

      setSuggestions(addresses);
      } catch(e){
        console.log('Error:', e);
      }
      
      
    } else {
      setSuggestions([]); // Clear suggestions if the search query is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Populate the input with selected suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for an address..."
      />
      <div>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingMapsAutosuggest;
