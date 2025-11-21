# BCM Mobile App

React Native mobile app for Better Calories Measurement using Expo.

## 📱 Quick Setup

### 1. Install Expo CLI
```bash
npm install -g @expo/cli
```

### 2. Install Dependencies
```bash
cd bcm-mobile
npm install
```

### 3. Start the App
```bash
npm start
```

### 4. Run on Your Phone
- Install **Expo Go** app from App Store/Play Store
- Scan the QR code from terminal with your phone
- App will load instantly on your device!

## 🔧 Backend Connection

**IMPORTANT**: Update the backend URL in `components/PhotoCapture.js`:

```javascript
// Replace YOUR_BACKEND_IP with your computer's IP address
const apiResponse = await axios.post('http://192.168.1.100:5000/api/predict-calories-base64', {
```

### Find Your IP Address:
- **Windows**: `ipconfig` (look for IPv4 Address)
- **Mac/Linux**: `ifconfig` (look for inet address)

## 📱 Features

- ✅ Native camera access
- ✅ Photo gallery selection  
- ✅ Real-time calorie analysis
- ✅ Touch-optimized UI
- ✅ Works on iOS & Android
- ✅ No app store needed (Expo Go)

## 🚀 Build for Production

```bash
# Build APK for Android
expo build:android

# Build IPA for iOS  
expo build:ios
```

## 📋 Requirements

- Node.js 16+
- Expo CLI
- Expo Go app on your phone
- Backend server running on your network