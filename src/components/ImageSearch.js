import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = ({ setSelectedImage }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const searchImages = async () => {
    if (!query.trim()) {
      setError('Please enter a valid search term.');
      return;
    }
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 16 },
        headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}` },
      });
      setImages(response.data.results);
      setError('');
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images. Please try again.');
    }
  };

  return (
    <div className="image-search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images"
        className="search-input"
      />
      <button onClick={searchImages} className="search-button">Search</button>
      {error && <p className="error-message">{error}</p>}
      <div className="image-grid">
        {images.map((image) => (
          <div className="image-item" key={image.id}>
            <img src={image.urls.small} alt={image.alt_description} />
            <button
              className="add-caption-button"
              onClick={() => setSelectedImage(image.urls.full)}
            >
              Add Captions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
