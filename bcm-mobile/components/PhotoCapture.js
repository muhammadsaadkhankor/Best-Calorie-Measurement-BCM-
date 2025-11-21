import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const PhotoCapture = ({ onResults, user, onShowProfile, onShowHistory, onLogout, globalTheme, setGlobalTheme, userProfilePhoto }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const cameraRef = useRef(null);

  const analyzeImage = async (imageUri) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const dummyData = {
        totalCalories: Math.floor(Math.random() * 400) + 200,
        confidence: Math.floor(Math.random() * 30) + 70,
        foodItems: [
          {
            name: 'Apple',
            calories: 95,
            weight: 180,
            unit: 'g',
            protein: 0.5,
            carbs: 25.0,
            fat: 0.3
          },
          {
            name: 'Banana',
            calories: 105,
            weight: 120,
            unit: 'g',
            protein: 1.3,
            carbs: 27.0,
            fat: 0.4
          },
          {
            name: 'Orange',
            calories: 62,
            weight: 150,
            unit: 'g',
            protein: 1.2,
            carbs: 15.4,
            fat: 0.2
          }
        ],
        macronutrients: {
          protein: 3.0,
          carbs: 67.4,
          fat: 0.9
        },
        timestamp: new Date().toISOString()
      };
      
      setIsAnalyzing(false);
      onResults(dummyData);
    }, 1500);
  };

  const requestCameraPermission = async () => {
    if (!permission?.granted) {
      const response = await requestPermission();
      if (response.granted) {
        setShowCamera(true);
      } else {
        Alert.alert('Permission denied', 'Camera access is required to take photos.');
      }
    } else {
      setShowCamera(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setUploadedImage(photo.uri);
      setShowCamera(false);
      analyzeImage(photo.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const showAbout = () => {
    Alert.alert(
      '🥗 About BCM',
      '✨ Better Calories Measurement\n\n📱 Smart nutrition tracking made simple\n🤖 AI-powered food recognition\n📊 Instant calorie analysis\n🎯 Personalized health insights\n\n🏢 BCM Technologies\n🌟 Making healthy eating effortless\n\n© 2024 BCM Technologies\nAll rights reserved',
      [
        { text: '❤️ Love it!', style: 'default' },
        { text: '📧 Contact Us', onPress: () => Alert.alert('📞 Contact BCM', '📧 Email: support@bcm.com\n🌐 Website: www.bcm.com\n📱 Follow us @BCMApp\n⭐ Rate us on App Store') }
      ]
    );
  };

  const showSettings = () => {
    const options = [
      { text: `🔔 Notifications (${notificationsEnabled ? 'ON' : 'OFF'})`, onPress: () => toggleNotifications() },
      { text: `🎨 Theme (${globalTheme})`, onPress: () => changeTheme() },
      { text: '🎯 Daily Goals', onPress: () => showDailyGoals() },
      { text: '🔒 Privacy Settings', onPress: () => showPrivacySettings() },
    ];
    
    if (!user?.isGuest) {
      options.push({ text: '👤 Profile', onPress: onShowProfile });
    } else {
      options.push({ text: '👤 Sign Up to Save Profile', onPress: () => Alert.alert('Guest Mode', 'Sign up to save your profile and track your progress!') });
    }
    
    options.push({ text: 'Cancel', style: 'cancel' });
    
    Alert.alert('Settings', 'Choose an option:', options);
  };

  const toggleNotifications = () => {
    Alert.alert(
      'Notifications',
      `Notifications are currently ${notificationsEnabled ? 'ON' : 'OFF'}`,
      [
        {
          text: notificationsEnabled ? 'Turn OFF' : 'Turn ON',
          onPress: () => {
            setNotificationsEnabled(!notificationsEnabled);
            Alert.alert('Success', `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}!`);
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const changeTheme = () => {
    Alert.alert(
      'Change Theme',
      `Current theme: ${globalTheme}\n\nSelect a new theme:`,
      [
        {
          text: '☀️ Light Mode',
          onPress: () => {
            setGlobalTheme('Light');
            Alert.alert('Theme Changed', 'Switched to Light Mode!');
          }
        },
        {
          text: '🌙 Dark Mode',
          onPress: () => {
            setGlobalTheme('Dark');
            Alert.alert('Theme Changed', 'Switched to Dark Mode!');
          }
        },
        {
          text: '🔄 Auto Mode',
          onPress: () => {
            setGlobalTheme('Auto');
            Alert.alert('Theme Changed', 'Switched to Auto Mode!');
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showDailyGoals = () => {
    Alert.alert(
      '🎯 Daily Nutrition Goals',
      '📊 Set your personalized targets',
      [
        { 
          text: '🔥 Calorie Target', 
          onPress: () => {
            Alert.alert(
              '🔥 Daily Calorie Goal',
              '⚡ Choose your daily energy target:\n\n🏃‍♀️ Active lifestyle? Go higher\n🧘‍♂️ Sedentary? Choose moderate\n🎯 Weight loss? Go lower',
              [
                { text: '🥗 1500 cal (Weight Loss)', onPress: () => Alert.alert('🎉 Goal Set!', '🔥 Daily calorie target: 1500 calories\n📉 Perfect for weight loss!') },
                { text: '⚖️ 2000 cal (Maintenance)', onPress: () => Alert.alert('🎉 Goal Set!', '🔥 Daily calorie target: 2000 calories\n⚖️ Great for maintaining weight!') },
                { text: '💪 2500 cal (Muscle Gain)', onPress: () => Alert.alert('🎉 Goal Set!', '🔥 Daily calorie target: 2500 calories\n💪 Perfect for building muscle!') },
                { text: '❌ Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { 
          text: '💪 Protein Target', 
          onPress: () => {
            Alert.alert(
              '💪 Daily Protein Goal',
              '🥩 Choose your daily protein target:\n\n🏋️‍♂️ Building muscle? Go higher\n🏃‍♀️ Active lifestyle? Choose moderate\n🧘‍♂️ Light activity? Go lower',
              [
                { text: '🥗 100g (Light Activity)', onPress: () => Alert.alert('🎉 Goal Set!', '💪 Daily protein target: 100g\n🥗 Great for light activity!') },
                { text: '🏃‍♀️ 150g (Active)', onPress: () => Alert.alert('🎉 Goal Set!', '💪 Daily protein target: 150g\n🏃‍♀️ Perfect for active lifestyle!') },
                { text: '🏋️‍♂️ 200g (Muscle Building)', onPress: () => Alert.alert('🎉 Goal Set!', '💪 Daily protein target: 200g\n🏋️‍♂️ Excellent for muscle building!') },
                { text: '❌ Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { 
          text: '💧 Hydration Goal', 
          onPress: () => {
            Alert.alert(
              '💧 Daily Water Goal',
              '🚰 Stay hydrated for optimal health!\n\n✅ 8 glasses recommended\n🏃‍♀️ More if you exercise\n🌡️ Extra in hot weather',
              [
                { text: '💧 6 glasses (2L)', onPress: () => Alert.alert('🎉 Goal Set!', '💧 Daily water target: 6 glasses (2L)\n🚰 Good start for hydration!') },
                { text: '💧 8 glasses (2.5L)', onPress: () => Alert.alert('🎉 Goal Set!', '💧 Daily water target: 8 glasses (2.5L)\n✅ Perfect daily hydration!') },
                { text: '💧 10 glasses (3L)', onPress: () => Alert.alert('🎉 Goal Set!', '💧 Daily water target: 10 glasses (3L)\n🏃‍♀️ Great for active lifestyle!') },
                { text: '❌ Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { text: '❌ Cancel', style: 'cancel' }
      ]
    );
  };

  const showPrivacySettings = () => {
    Alert.alert(
      '🔐 Privacy & Security',
      '🛡️ Protect your account and data',
      [
        { 
          text: '📊 Data Sharing Settings', 
          onPress: () => {
            Alert.alert(
              '📊 Data Sharing',
              '🔬 Help improve BCM by sharing anonymized usage data for research purposes.\n\n✅ Your personal information stays private\n📈 Helps us enhance the app\n🎯 Better food recognition accuracy',
              [
                { text: '❌ Keep Private', style: 'cancel' },
                { text: '✅ Share & Help', onPress: () => Alert.alert('🎉 Thank You!', 'Data sharing enabled! Your contribution helps make BCM better for everyone.') }
              ]
            );
          }
        },
        { 
          text: '📅 History Settings', 
          onPress: () => {
            Alert.alert(
              '📅 Data Retention',
              '🗂️ Choose how long to keep your meal history:\n\n📊 Longer = Better insights\n🔒 Shorter = More privacy\n⚖️ Find your balance',
              [
                { text: '📅 7 days', onPress: () => Alert.alert('✅ Updated!', '📅 History retention set to 7 days\n🔒 Maximum privacy mode!') },
                { text: '📅 30 days', onPress: () => Alert.alert('✅ Updated!', '📅 History retention set to 30 days\n⚖️ Balanced approach!') },
                { text: '📅 90 days', onPress: () => Alert.alert('✅ Updated!', '📅 History retention set to 90 days\n📊 Best for insights!') },
                { text: '❌ Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { 
          text: '🔒 Account Security', 
          onPress: () => {
            Alert.alert(
              '🔒 Security Center',
              '🛡️ Keep your account safe and secure',
              [
                { text: '🔑 Change Password', onPress: () => Alert.alert('🔑 Password', 'Password change feature coming soon!') },
                { text: '📱 Two-Factor Auth', onPress: () => Alert.alert('📱 2FA', 'Two-factor authentication setup coming soon!') },
                { text: '🚪 Login History', onPress: () => Alert.alert('🚪 Login History', 'View recent login activity coming soon!') },
                { text: '❌ Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { text: '❌ Cancel', style: 'cancel' }
      ]
    );
  };

  const flipCamera = () => {
    setCameraFacing(current => current === 'back' ? 'front' : 'back');
  };

  const isDark = globalTheme === 'Dark';
  const themeStyles = {
    container: { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' },
    header: { backgroundColor: isDark ? '#2d2d2d' : '#4CAF50' },
    title: { color: isDark ? 'white' : '#333' },
    subtitle: { color: isDark ? '#ccc' : '#666' },
    card: { backgroundColor: isDark ? '#2d2d2d' : 'white' },
    placeholderText: { color: isDark ? '#ccc' : '#666' },
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} facing={cameraFacing}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
              <Text style={styles.flipIcon}>🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCamera(false)}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={[styles.header, themeStyles.header]}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>🥗 BCM</Text>
          <Text style={styles.tagline}>{user?.isGuest ? 'Guest Mode' : 'Smart Nutrition'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.profileButton} onPress={onShowProfile}>
            <Text style={styles.profileIcon}>👨‍💼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton} onPress={showSettings}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton} onPress={onShowHistory}>
            <Text style={styles.historyIcon}>📊</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={[styles.title, themeStyles.title]}>Track Your Calories</Text>
      <Text style={[styles.subtitle, themeStyles.subtitle]}>Snap a photo and get instant nutrition analysis</Text>

      <View style={[styles.card, themeStyles.card]}>
        {uploadedImage ? (
          <View>
            <Image source={{ uri: uploadedImage }} style={styles.image} />
            {isAnalyzing ? (
              <View style={styles.analyzing}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.analyzingText}>Analyzing your meal with AI...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.retakeButton} onPress={() => setUploadedImage(null)}>
                <Text style={styles.buttonText}>Take Different Photo</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={[styles.placeholderText, themeStyles.placeholderText]}>No image selected</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton} onPress={requestCameraPermission}>
                <Text style={styles.primaryButtonIcon}>📷</Text>
                <Text style={styles.primaryButtonText}>Take Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
                <Text style={styles.secondaryButtonIcon}>🖼️</Text>
                <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  profileIcon: {
    fontSize: 20,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  settingsIcon: {
    fontSize: 20,
  },
  historyButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  historyIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 25,
  },
  flipIcon: {
    fontSize: 20,
    color: 'white',
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 25,
  },
  closeIcon: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  analyzing: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  analyzingText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 12,
  },
  retakeButton: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
  },
});

export default PhotoCapture;