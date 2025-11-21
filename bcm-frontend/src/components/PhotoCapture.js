import React, { useState, useRef } from 'react';
import axios from 'axios';

const PhotoCapture = ({ onResults }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post('/api/predict-calories-base64', {
        imageData
      });
      onResults(response.data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        analyzeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error('Camera error:', error);
      alert('Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 640, 480);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setUploadedImage(imageData);
      
      // Stop camera
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setShowCamera(false);
      
      analyzeImage(imageData);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  return (
    <div style={{ padding: '20px 0', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            BCM - Calorie Measurement
          </h1>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
            Take a photo or upload an image of your food for AI analysis
          </p>

          <div className="card" style={{ marginBottom: '32px' }}>
            {showCamera ? (
              <div>
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  muted
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={capturePhoto}>
                    <i className="fas fa-camera"></i>
                    Capture
                  </button>
                  <button className="btn btn-outline" onClick={stopCamera}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : !uploadedImage ? (
              <div style={{ 
                padding: '64px 32px',
                border: '2px dashed #ddd',
                borderRadius: '12px',
                background: '#f8f9fa'
              }}>
                <i className="fas fa-camera" style={{ 
                  fontSize: '48px', 
                  color: '#ccc', 
                  marginBottom: '24px' 
                }}></i>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '24px' }}>
                  No image selected
                </p>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={startCamera}>
                    <i className="fas fa-camera"></i>
                    Take Photo
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <i className="fas fa-upload"></i>
                    Upload Image
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded food" 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '24px'
                  }} 
                />
                
                {isAnalyzing ? (
                  <div style={{ padding: '32px' }}>
                    <div style={{ 
                      width: '40px',
                      height: '40px',
                      border: '4px solid #f3f3f3',
                      borderTop: '4px solid #4CAF50',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 16px'
                    }}></div>
                    <p style={{ fontSize: '18px', color: '#4CAF50', fontWeight: '600' }}>
                      Analyzing your meal with AI...
                    </p>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline"
                    onClick={() => setUploadedImage(null)}
                  >
                    Upload Different Image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCapture;