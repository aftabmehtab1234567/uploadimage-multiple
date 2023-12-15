import React, { useState } from 'react';
import { uploadMultipleImages } from '../Services/api';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Perform any actions with the selectedFiles array, such as uploading to a server.

    // For demonstration purposes, log the file names to the console.
    selectedFiles.forEach((file) => {
      console.log(file.name);
    });

    // Call your API function to upload files
    try {
      const response = await uploadMultipleImages(selectedFiles);
      // Display response as a popup message
      window.alert(`Upload successful: ${JSON.stringify(response)}`);
    } catch (error) {
      console.error('Error uploading images:', error);
      // Display error message as a popup
      window.alert(`Error uploading images: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Image Upload Form</h1>
      <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
        {/* ... rest of the form ... */}
        <div>
          <label htmlFor="imageUpload">Select Images:</label>
          <input
            type="file"
            id="imageUpload"
            name="file[]"
            accept="image/*"
            multiple // Add this attribute for multiple file selection
            onChange={handleFileChange}
          />
        </div>
        {/* ... rest of the form ... */}
        <div>
          <button type="submit">
            Upload Images
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
