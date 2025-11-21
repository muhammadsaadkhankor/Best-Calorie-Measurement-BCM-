# BCM Backend

Backend API for Better Calories Measurement app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

- `POST /api/predict-calories` - Upload image file for calorie prediction
- `POST /api/predict-calories-base64` - Send base64 image data for prediction
- `GET /api/health` - Health check endpoint

## Features

- Image processing with Sharp
- AI calorie prediction simulation
- Macronutrient analysis
- CORS enabled for frontend integration