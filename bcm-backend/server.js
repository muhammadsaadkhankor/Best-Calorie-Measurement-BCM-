const express = require('express');
const cors = require('cors');
const multer = require('multer');
const calorieService = require('./services/calorieService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  }
});

// Routes
app.post('/api/predict-calories', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const prediction = await calorieService.predictCalories(req.file.buffer);
    res.json(prediction);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to predict calories' });
  }
});

app.post('/api/predict-calories-base64', async (req, res) => {
  try {
    console.log('Received base64 prediction request');
    const { imageData } = req.body;
    if (!imageData) {
      console.log('No image data provided');
      return res.status(400).json({ error: 'No image data provided' });
    }

    console.log('Processing image data...');
    const prediction = await calorieService.predictCaloriesFromBase64(imageData);
    console.log('Prediction completed:', prediction);
    res.json(prediction);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to predict calories' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BCM Backend is running' });
});

app.listen(PORT, () => {
  console.log(`BCM Backend running on port ${PORT}`);
});