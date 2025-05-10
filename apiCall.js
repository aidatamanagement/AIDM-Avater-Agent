// apiCall.js

const fetch = require('node-fetch');

const apiKey = '4365fd37acf1451da98a1810e397c7ac';  // আপনার API কী
const url = 'https://tavusapi.com/v2/conversations';

async function callTavusAPI() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        replica_id: 'r9fa0878977a',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;  // Return the data instead of just logging it
  } catch (error) {
    console.error('Error:', error);  // এরর মেসেজ দেখতে
    throw error;  // Re-throw the error to handle it in the calling function
  }
}

module.exports = callTavusAPI;  // Export the function for use in other files
