# 🥗 BCM - Better Calories Measurement (Separated Architecture)

A **separated frontend/backend architecture** for **smart visual calorie tracking** using **AI-powered food analysis**.

## 🏗️ Architecture

- **Frontend**: React app with photo capture/upload UI
- **Backend**: Node.js/Express API with calorie prediction service

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd bcm-backend
npm install
npm run dev
```
Backend runs on: http://localhost:5000

### 2. Frontend Setup
```bash
cd bcm-frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## 📁 Project Structure

```
bcm-backend/
├── server.js              # Express server
├── services/
│   └── calorieService.js   # AI prediction logic
└── package.json

bcm-frontend/
├── src/
│   ├── components/
│   │   ├── PhotoCapture.js # Camera/upload component
│   │   └── Results.js      # Results display
│   └── App.js             # Main app component
└── package.json
```

## 🔧 Features

### Frontend
- 📷 Camera capture with device camera
- 📤 Image upload functionality
- 🎨 Clean, responsive UI
- 📊 Real-time results display

### Backend
- 🤖 AI calorie prediction simulation
- 🖼️ Image processing with Sharp
- 📈 Macronutrient analysis
- 🔌 RESTful API endpoints

## 🌐 API Endpoints

- `POST /api/predict-calories-base64` - Analyze base64 image
- `POST /api/predict-calories` - Analyze uploaded file
- `GET /api/health` - Health check

## 🔮 Future Enhancements

- Real AI model integration (TensorFlow.js, OpenAI Vision)
- User authentication
- Meal history storage
- Mobile app development