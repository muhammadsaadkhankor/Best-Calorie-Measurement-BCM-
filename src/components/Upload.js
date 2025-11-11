import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import calorieEstimationService from '../services/calorieEstimation';

const Upload = ({ onNavigate }) => {
  const { colors } = useTheme();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsAnalyzing(true);
        
        calorieEstimationService.estimateCalories(e.target.result)
          .then(estimation => {
            localStorage.setItem('lastEstimation', JSON.stringify(estimation));
            setIsAnalyzing(false);
            onNavigate('results');
          })
          .catch(error => {
            console.error('Estimation failed:', error);
            setIsAnalyzing(false);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async (mode = facingMode) => {
    try {
      // Stop existing stream if any
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: mode }
      });
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error('Camera error:', error);
      // Fallback to any available camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setShowCamera(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 100);
      } catch (fallbackError) {
        alert('Camera access denied or not available');
      }
    }
  };

  const capturePhoto = async () => {
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
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      setShowCamera(false);
      
      setIsAnalyzing(true);
      
      calorieEstimationService.estimateCalories(imageData)
        .then(estimation => {
          localStorage.setItem('lastEstimation', JSON.stringify(estimation));
          setIsAnalyzing(false);
          onNavigate('results');
        })
        .catch(error => {
          console.error('Estimation failed:', error);
          setIsAnalyzing(false);
        });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const switchCamera = async () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    await startCamera(newMode);
  };



  return (
    <div className="mobile-safe-area" style={{ padding: '20px 0', minHeight: '100vh', background: colors.background }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: colors.text, marginBottom: '16px' }}>
            Add Your Meal
          </h1>
          <p style={{ color: colors.textSecondary, fontSize: '16px', marginBottom: '32px' }}>
            Take a photo or upload an image of your food for AI analysis
          </p>
              <div className="card" style={{ marginBottom: '32px', background: colors.surface, border: `1px solid ${colors.border}` }}>
            {showCamera ? (
              <div>
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  muted
                  width="640"
                  height="480"
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={capturePhoto}
                    style={{ fontSize: '16px', padding: '12px 24px' }}
                  >
                    <i className="fas fa-camera" style={{ marginRight: '8px' }}></i>
                    Capture
                  </button>
                  <button 
                    className="btn"
                    onClick={switchCamera}
                    style={{ 
                      fontSize: '16px', 
                      padding: '12px 16px',
                      background: colors.input,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <i className="fas fa-camera" style={{ marginRight: '4px' }}></i>
                    <i className="fas fa-sync-alt"></i>
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={stopCamera}
                    style={{ fontSize: '16px', padding: '12px 24px' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : !uploadedImage ? (
              <div style={{ 
                padding: '64px 32px',
                border: `2px dashed ${colors.border}`,
                borderRadius: '12px',
                background: colors.input
              }}>
                <i className="fas fa-camera" style={{ 
                  fontSize: '48px', 
                  color: '#ccc', 
                  marginBottom: '24px' 
                }}></i>
                <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '24px' }}>
                  No image selected
                </p>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <input
                  id="cameraInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={startCamera}
                    style={{ fontSize: '16px', padding: '12px 24px' }}
                  >
                    <i className="fas fa-camera" style={{ marginRight: '8px' }}></i>
                    Take Photo
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{ fontSize: '16px', padding: '12px 24px' }}
                  >
                    <i className="fas fa-upload" style={{ marginRight: '8px' }}></i>
                    Upload Image
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ 
                  width: '100%',
                  height: '200px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded food" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} 
                  />
                </div>
                
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
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                      This may take a few seconds
                    </p>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setUploadedImage(null);
                      setIsAnalyzing(false);
                    }}
                  >
                    Upload Different Image
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px',
            marginTop: '32px'
          }}>
            <div style={{ 
              padding: '16px',
              background: colors.input,
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <i className="fas fa-brain" style={{ fontSize: '24px', color: '#4CAF50', marginBottom: '8px' }}></i>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: colors.text }}>AI Recognition</p>
              <p style={{ fontSize: '12px', color: colors.textSecondary }}>Advanced food identification</p>
            </div>
            <div style={{ 
              padding: '16px',
              background: colors.input,
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <i className="fas fa-calculator" style={{ fontSize: '24px', color: '#FF9800', marginBottom: '8px' }}></i>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: colors.text }}>Calorie Estimation</p>
              <p style={{ fontSize: '12px', color: colors.textSecondary }}>Accurate nutrition analysis</p>
            </div>
            <div style={{ 
              padding: '16px',
              background: colors.input,
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <i className="fas fa-chart-line" style={{ fontSize: '24px', color: '#2196F3', marginBottom: '8px' }}></i>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: colors.text }}>Progress Tracking</p>
              <p style={{ fontSize: '12px', color: colors.textSecondary }}>Automatic goal updates</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Upload;