import React, { useEffect, useRef } from 'react';
import { Canvas, Image, Textbox, Circle, Rect, Triangle, Polygon } from 'fabric';

const CanvasEditor = ({ selectedImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas('imageCanvas', {
      width: 800,
      height: 600,
    });

    // Load the selected image into the canvas
    Image.fromURL(selectedImage, (img) => {
      img.scaleToWidth(800);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        crossOrigin: 'anonymous',
      });
    }, {
      // Error handling for image loading
      onError: () => {
        console.error('Error loading image');
        alert('Failed to load image. Please try another one.');
      }
    });

    // Function to log canvas layers
    const logCanvasLayers = () => {
      const layers = canvas.getObjects().map((obj) => {
        return {
          type: obj.type,
          left: obj.left,
          top: obj.top,
          width: obj.width || obj.radius * 2 || 0,
          height: obj.height || obj.radius * 2 || 0,
          text: obj.text || '',
          fill: obj.fill || '',
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          angle: obj.angle,
        };
      });
      console.log('Canvas Layers:', layers);
    };

    // Function to add text (caption) to the canvas
    const addText = () => {
      const text = new Textbox('Add your caption', {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 20,
        fill: '#000',
        editable: true,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      logCanvasLayers(); // Log layers after adding text
    };

    // Function to add shapes to the canvas
    const addShape = (shapeType) => {
      let shape;
      if (shapeType === 'circle') {
        shape = new Circle({ radius: 50, fill: 'blue', left: 100, top: 100 });
      } else if (shapeType === 'rectangle') {
        shape = new Rect({ width: 100, height: 100, fill: 'green', left: 100, top: 100 });
      } else if (shapeType === 'triangle') {
        shape = new Triangle({ width: 100, height: 100, fill: 'red', left: 100, top: 100 });
      } else if (shapeType === 'polygon') {
        shape = new Polygon(
          [
            { x: 200, y: 0 },
            { x: 250, y: 50 },
            { x: 200, y: 100 },
            { x: 150, y: 50 }
          ],
          {
            left: 100, top: 100, fill: 'purple'
          }
        );
      }
      canvas.add(shape);
      canvas.setActiveObject(shape);
      logCanvasLayers(); // Log layers after adding shape
    };

    // Event listeners for adding text and shapes
    document.getElementById('addText').addEventListener('click', addText);
    document.getElementById('addCircle').addEventListener('click', () => addShape('circle'));
    document.getElementById('addRectangle').addEventListener('click', () => addShape('rectangle'));
    document.getElementById('addTriangle').addEventListener('click', () => addShape('triangle'));
    document.getElementById('addPolygon').addEventListener('click', () => addShape('polygon'));

    // Clean up the canvas when component unmounts
    return () => {
      canvas.dispose();
    };
  }, [selectedImage]);

  // Function to download the image from the canvas
  const downloadImage = () => {
    const canvas = canvasRef.current; // Get the reference to the fabric canvas
    const link = document.createElement('a'); // Create a link element
    link.href = canvas.toDataURL({ format: 'png' }); // Export canvas content as a PNG
    link.download = 'edited-image.png'; // Set the download file name
    link.click(); // Trigger the download
  };

  return (
    <div>
      <h2>Image Editor</h2>
      <canvas id="imageCanvas" ref={canvasRef}></canvas>
      <div className="tools">
        <button id="addText">Add Caption</button>
        <button id="addCircle">Add Circle</button>
        <button id="addRectangle">Add Rectangle</button>
        <button id="addTriangle">Add Triangle</button>
        <button id="addPolygon">Add Polygon</button>
      </div>
      <button className="download-button" onClick={downloadImage}>Download</button>
    </div>
  );
};

export default CanvasEditor;
