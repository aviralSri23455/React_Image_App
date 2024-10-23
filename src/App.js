import React, { useState } from 'react';
import ImageSearch from './components/ImageSearch';
import CanvasEditor from './components/CanvasEditor';
import '../src/Styles/styles.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <h1>Image Search and Caption App</h1>
      <ImageSearch setSelectedImage={setSelectedImage} />
      {selectedImage && <CanvasEditor selectedImage={selectedImage} />}
    </div>
  );
}

export default App;
