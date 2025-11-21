# 📱 BCM Mobile App

React Native mobile application for Better Calories Measurement with AI-powered food recognition.

---

## 🚀 Installation Steps

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Smartphone** (iOS or Android)
- **Same WiFi Network** for phone and computer

### Step 1: Install Expo CLI Globally
```bash
npm install -g expo-cli
```

### Step 2: Clone Repository
```bash
git clone https://github.com/muhammadsaadkhankor/Best-Calorie-Measurement-BCM-.git
cd Best-Calorie-Measurement-BCM-
```

### Step 3: Install Mobile App Dependencies
```bash
cd bcm-mobile
npm install
```

### Step 4: Install Backend Dependencies
```bash
cd ../bcm-backend
npm install
```

### Step 5: Start Backend Server
```bash
node server.js
```
**Backend will run on:** `http://localhost:5000`

### Step 6: Start Mobile App (New Terminal)
```bash
cd bcm-mobile
npm start
```

### Step 7: Install Expo Go on Your Phone
- **iOS**: [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Download from Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 8: Scan QR Code
- **iOS**: Open Camera app → Scan QR code from terminal
- **Android**: Open Expo Go app → Scan QR code from terminal

### Step 9: Wait for App to Load
The app will bundle and load on your phone (takes 30-60 seconds first time)

---

## ⚙️ Configuration

### Update Backend URL (If Needed)

If the app can't connect to backend, update the IP address:

1. **Find Your Computer's IP Address:**
   - **Windows**: Open CMD → Type `ipconfig` → Look for IPv4 Address
   - **Mac**: Open Terminal → Type `ifconfig` → Look for inet address
   - **Linux**: Open Terminal → Type `hostname -I`

2. **Update in `components/PhotoCapture.js`:**
```javascript
// Line ~90
const apiResponse = await axios.post('http://YOUR_IP_ADDRESS:5000/api/predict-calories-base64', {
```

Example: `http://192.168.1.100:5000/api/predict-calories-base64`

---

## ✨ Features

### 🔐 Authentication
- Login/Signup with email
- Guest mode (no account needed)
- Password reset functionality

### 👤 Profile Management
- Edit name, email, date of birth
- Profile photo upload (camera/gallery)
- Age calculation
- Theme switching (Light/Dark/Auto)

### 📸 Food Tracking
- Take photo with camera
- Choose from gallery
- AI calorie analysis
- Macronutrient breakdown (Protein, Carbs, Fat)
- Food item detection

### 📊 History & Analytics
- **Today**: Individual meals with time and macros
- **Week**: Daily summaries with total calories
- **Month**: Weekly averages
- Delete individual meals
- Empty state when no data

### 🎨 Customization
- Light/Dark/Auto theme modes
- Theme persists across all screens
- Notifications toggle
- Daily nutrition goals

### ⚙️ Settings
- Daily calorie goals (1500/2000/2500)
- Protein targets (100g/150g/200g)
- Privacy & security options
- Data sharing preferences

---

## 📱 Supported Platforms

- ✅ **iOS** (iPhone/iPad)
- ✅ **Android** (Phone/Tablet)
- ✅ **No App Store Required** (via Expo Go)

---

## 🏗️ Build for Production

### Android APK
```bash
eas build --platform android
```

### iOS IPA
```bash
eas build --platform ios
```

---

## 🐛 Troubleshooting

### App Won't Connect to Backend
- Ensure phone and computer are on same WiFi
- Check firewall isn't blocking port 5000
- Verify backend is running (`node server.js`)
- Update IP address in PhotoCapture.js

### QR Code Won't Scan
- Make sure Expo Go is installed
- Try typing the URL manually in Expo Go
- Restart the development server

### App Crashes on Startup
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo: `npm install expo@latest`

---

## 📦 Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Axios** - HTTP requests
- **Expo Camera** - Camera access
- **Expo Image Picker** - Gallery access
- **AsyncStorage** - Local storage

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Developer

Muhammad Saad Khan  
GitHub: [@muhammadsaadkhankor](https://github.com/muhammadsaadkhankor)