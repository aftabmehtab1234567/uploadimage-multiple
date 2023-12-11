import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust the port as needed

export const uploadMultipleImages = async (files) => {
  try {
    const formData = new FormData();

    // Append each selected file to the FormData
    files.forEach((file) => {
        formData.append('file[]', file);
      });
      

    // Make a POST request to the server endpoint
    const response = await axios.post(`${API_URL}/upload`, formData);

    // Check if the response status is within the success range (2xx)
    if (response.status >= 200 && response.status < 300) {
      console.log('Upload successful:', response.data);
      // You can do something with the response, e.g., update state or show a success message
    } else {
      // Handle unexpected response status
      console.error('Unexpected response status:', response.status);
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    // Handle errors
    console.error('Error uploading images:', error);
    // You can update state or show an error message
    throw error;
  }
};

export default API_URL;
