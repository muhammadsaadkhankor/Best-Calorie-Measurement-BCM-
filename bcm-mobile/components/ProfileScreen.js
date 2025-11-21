import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ user, onUpdateProfile, onLogout, onBack, globalTheme, setGlobalTheme, userProfilePhoto, onUpdateProfilePhoto }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState('01-01-1990');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [passwordStep, setPasswordStep] = useState(1);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const calculateAge = (dob) => {
    const today = new Date();
    // Convert DD-MM-YYYY to YYYY-MM-DD for Date constructor
    const [day, month, year] = dob.split('-');
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const editName = () => {
    setInputType('name');
    setInputTitle('Edit Name');
    setInputValue(name);
    setShowInputModal(true);
  };

  const editEmail = () => {
    setInputType('email');
    setInputTitle('Edit Email');
    setInputValue(email);
    setShowInputModal(true);
  };

  const editDateOfBirth = () => {
    setInputType('dob');
    setInputTitle('Edit Date of Birth');
    setInputValue(dateOfBirth);
    setShowInputModal(true);
  };

  const changeProfilePhoto = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose photo source:',
      [
        {
          text: '📷 Take Photo',
          onPress: () => takePhoto()
        },
        {
          text: '🖼️ Choose from Gallery',
          onPress: () => pickImage()
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (onUpdateProfilePhoto && typeof onUpdateProfilePhoto === 'function') {
        onUpdateProfilePhoto(result.assets[0].uri);
        Alert.alert('Success', 'Profile photo updated!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (onUpdateProfilePhoto && typeof onUpdateProfilePhoto === 'function') {
        onUpdateProfilePhoto(result.assets[0].uri);
        Alert.alert('Success', 'Profile photo updated!');
      }
    }
  };

  const changePassword = () => {
    setPasswordStep(1);
    setInputType('currentPassword');
    setInputTitle('Current Password');
    setInputValue('');
    setShowInputModal(true);
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    Alert.alert('Success', `Notifications ${newState ? 'enabled' : 'disabled'}!`);
  };

  const changeTheme = () => {
    Alert.alert(
      'Change Theme',
      `Current: ${globalTheme}`,
      [
        {
          text: '☀️ Light',
          onPress: () => {
            setGlobalTheme('Light');
            Alert.alert('Theme Changed', 'Switched to Light Mode!');
          }
        },
        {
          text: '🌙 Dark',
          onPress: () => {
            setGlobalTheme('Dark');
            Alert.alert('Theme Changed', 'Switched to Dark Mode!');
          }
        },
        {
          text: '🔄 Auto',
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
      'Daily Goals',
      'Set your nutrition targets:',
      [
        { 
          text: '🎯 Calorie Goals', 
          onPress: () => {
            Alert.alert(
              'Calorie Goal',
              'Choose your daily calorie target:',
              [
                { text: '1500 calories', onPress: () => Alert.alert('Success', 'Daily calorie goal set to 1500 calories!') },
                { text: '2000 calories', onPress: () => Alert.alert('Success', 'Daily calorie goal set to 2000 calories!') },
                { text: '2500 calories', onPress: () => Alert.alert('Success', 'Daily calorie goal set to 2500 calories!') },
                { text: 'Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { 
          text: '💪 Protein Goals', 
          onPress: () => {
            Alert.alert(
              'Protein Goal',
              'Choose your daily protein target:',
              [
                { text: '100g protein', onPress: () => Alert.alert('Success', 'Daily protein goal set to 100g!') },
                { text: '150g protein', onPress: () => Alert.alert('Success', 'Daily protein goal set to 150g!') },
                { text: '200g protein', onPress: () => Alert.alert('Success', 'Daily protein goal set to 200g!') },
                { text: 'Cancel', style: 'cancel' }
              ]
            );
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const deleteHistory = () => {
    Alert.alert(
      'Delete History',
      'Choose what data to delete:',
      [
        {
          text: '📅 Delete Today',
          onPress: () => {
            Alert.alert(
              'Confirm Delete',
              'Delete all data from today? This cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Delete', 
                  style: 'destructive', 
                  onPress: () => {
                    // Simulate deletion
                    setTimeout(() => {
                      Alert.alert('Success', 'Today\'s data has been deleted!');
                    }, 500);
                  }
                }
              ]
            );
          }
        },
        {
          text: '📅 Delete This Week',
          onPress: () => {
            Alert.alert(
              'Confirm Delete',
              'Delete all data from this week? This cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Delete', 
                  style: 'destructive', 
                  onPress: () => {
                    setTimeout(() => {
                      Alert.alert('Success', 'This week\'s data has been deleted!');
                    }, 500);
                  }
                }
              ]
            );
          }
        },
        {
          text: '🗑️ Delete All History',
          onPress: () => {
            Alert.alert(
              'Confirm Delete All',
              'Delete ALL your data? This cannot be undone!',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Delete All', 
                  style: 'destructive', 
                  onPress: () => {
                    setTimeout(() => {
                      Alert.alert('Success', 'All data has been permanently deleted!');
                    }, 500);
                  }
                }
              ]
            );
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showPrivacySettings = () => {
    Alert.alert(
      'Privacy & Security',
      'Manage your privacy and security:',
      [
        { text: '🔒 Change Password', onPress: changePassword },
        { 
          text: '📊 Data Sharing (OFF)', 
          onPress: () => {
            Alert.alert(
              'Data Sharing',
              'Allow BCM to share anonymized data for research?',
              [
                { text: 'Keep OFF', style: 'cancel' },
                { text: 'Turn ON', onPress: () => Alert.alert('Updated', 'Data sharing enabled!') }
              ]
            );
          }
        },
        { text: '🗑️ Delete History', onPress: deleteHistory },
        { 
          text: '🔐 Two-Factor Auth', 
          onPress: () => {
            Alert.alert(
              '2FA Setup',
              'Two-factor authentication adds extra security to your account.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Enable 2FA', onPress: () => Alert.alert('Success', '2FA has been enabled!') }
              ]
            );
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleInputSave = () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', 'Please enter a value');
      return;
    }

    switch (inputType) {
      case 'name':
        setName(inputValue.trim());
        onUpdateProfile({ ...user, name: inputValue.trim() });
        Alert.alert('Success', 'Name updated successfully!');
        break;
      case 'email':
        if (!inputValue.includes('@')) {
          Alert.alert('Error', 'Please enter a valid email address');
          return;
        }
        setEmail(inputValue.trim());
        onUpdateProfile({ ...user, email: inputValue.trim() });
        Alert.alert('Success', 'Email updated successfully!');
        break;
      case 'dob':
        if (!inputValue.match(/^\d{2}-\d{2}-\d{4}$/)) {
          Alert.alert('Error', 'Please enter date in DD-MM-YYYY format');
          return;
        }
        setDateOfBirth(inputValue);
        Alert.alert('Success', 'Date of birth updated successfully!');
        break;
      case 'currentPassword':
        if (inputValue.length < 3) {
          Alert.alert('Error', 'Current password is incorrect');
          return;
        }
        setCurrentPasswordInput(inputValue);
        setPasswordStep(2);
        setInputType('newPassword');
        setInputTitle('New Password');
        setInputValue('');
        return;
      case 'newPassword':
        if (inputValue.length < 6) {
          Alert.alert('Error', 'New password must be at least 6 characters');
          return;
        }
        if (inputValue === currentPasswordInput) {
          Alert.alert('Error', 'New password must be different from current password');
          return;
        }
        Alert.alert('Success', 'Password updated successfully!');
        setPasswordStep(1);
        setCurrentPasswordInput('');
        break;
    }
    setShowInputModal(false);
    setInputValue('');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout, style: 'destructive' }
      ]
    );
  };

  const isDark = globalTheme === 'Dark';
  const themeStyles = {
    container: { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' },
    header: { backgroundColor: isDark ? '#2d2d2d' : '#4CAF50' },
    profileSection: { backgroundColor: isDark ? '#2d2d2d' : 'white' },
    form: { backgroundColor: isDark ? '#2d2d2d' : 'white' },
    settingsSection: { backgroundColor: isDark ? '#2d2d2d' : 'white' },
    settingCard: { backgroundColor: isDark ? '#3d3d3d' : '#f8f9fa' },
    text: { color: isDark ? 'white' : '#333' },
    inputDisplay: { backgroundColor: isDark ? '#3d3d3d' : '#f8f9fa', borderColor: isDark ? '#555' : '#ddd' },
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={[styles.header, themeStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.profileSection, themeStyles.profileSection]}>
          <TouchableOpacity style={styles.avatarContainer} onPress={changeProfilePhoto}>
            {userProfilePhoto ? (
              <Image source={{ uri: userProfilePhoto }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.userName, themeStyles.text]}>{name}</Text>
          <Text style={[styles.userEmail, isDark ? { color: '#ccc' } : {}]}>{email}</Text>
        </View>

        <View style={[styles.form, themeStyles.form]}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Personal Information</Text>
          
          <TouchableOpacity style={styles.inputGroup} onPress={editName}>
            <Text style={styles.label}>Full Name</Text>
            <View style={[styles.inputDisplay, themeStyles.inputDisplay]}>
              <Text style={[styles.inputText, themeStyles.text]}>{name}</Text>
              <Text style={styles.editArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputGroup} onPress={editEmail}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputDisplay, themeStyles.inputDisplay]}>
              <Text style={[styles.inputText, themeStyles.text]}>{email}</Text>
              <Text style={styles.editArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputGroup} onPress={editDateOfBirth}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={[styles.inputDisplay, themeStyles.inputDisplay]}>
              <Text style={[styles.inputText, themeStyles.text]}>{dateOfBirth} (Age: {calculateAge(dateOfBirth)})</Text>
              <Text style={styles.editArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.settingsSection, themeStyles.settingsSection]}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={toggleNotifications}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={[styles.settingText, themeStyles.text]}>Notifications</Text>
            <View style={styles.toggleContainer}>
              <View style={[styles.toggle, notificationsEnabled && styles.toggleActive]}>
                <View style={[styles.toggleButton, notificationsEnabled && styles.toggleButtonActive]} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingCard, themeStyles.settingCard]} onPress={showDailyGoals}>
            <View style={[styles.settingIconContainer, { backgroundColor: '#FF9800' }]}>
              <Text style={styles.settingCardIcon}>🎯</Text>
            </View>
            <View style={styles.settingCardContent}>
              <Text style={[styles.settingCardTitle, themeStyles.text]}>Daily Goals</Text>
              <Text style={styles.settingCardSubtitle}>Set nutrition targets</Text>
            </View>
            <Text style={styles.settingCardArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingCard, themeStyles.settingCard]} onPress={changeTheme}>
            <View style={[styles.settingIconContainer, { backgroundColor: '#9C27B0' }]}>
              <Text style={styles.settingCardIcon}>🎨</Text>
            </View>
            <View style={styles.settingCardContent}>
              <Text style={[styles.settingCardTitle, themeStyles.text]}>Theme</Text>
              <Text style={styles.settingCardSubtitle}>Current: {globalTheme}</Text>
            </View>
            <Text style={styles.settingCardArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingCard, themeStyles.settingCard]} onPress={showPrivacySettings}>
            <View style={[styles.settingIconContainer, { backgroundColor: '#F44336' }]}>
              <Text style={styles.settingCardIcon}>🔒</Text>
            </View>
            <View style={styles.settingCardContent}>
              <Text style={[styles.settingCardTitle, themeStyles.text]}>Privacy & Security</Text>
              <Text style={styles.settingCardSubtitle}>Manage your data</Text>
            </View>
            <Text style={styles.settingCardArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showInputModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{inputTitle}</Text>
            <Text style={styles.modalSubtitle}>
              {inputType === 'dob' ? 'Format: DD-MM-YYYY (e.g., 15-05-1990)' : 
               inputType === 'currentPassword' ? 'Enter your current password to verify' :
               inputType === 'newPassword' ? 'Enter new password (min 6 characters)' :
               inputType === 'email' ? 'Enter valid email address' :
               'Enter your full name'}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={inputType === 'dob' ? '15-05-1990' : 
                          inputType === 'currentPassword' ? 'Current password' :
                          inputType === 'newPassword' ? 'New password' :
                          inputType === 'email' ? 'your@email.com' :
                          'Your name'}
              secureTextEntry={inputType === 'currentPassword' || inputType === 'newPassword'}
              keyboardType={inputType === 'email' ? 'email-address' : 'default'}
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton} 
                onPress={() => {
                  setShowInputModal(false);
                  setInputValue('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveButton} onPress={handleInputSave}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  cameraText: {
    fontSize: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  inputDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  settingsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  settingStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  toggleContainer: {
    alignItems: 'flex-end',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  toggleButtonActive: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  modalSaveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginLeft: 8,
    alignItems: 'center',
  },
  modalSaveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingCardIcon: {
    fontSize: 20,
    color: 'white',
  },
  settingCardContent: {
    flex: 1,
  },
  settingCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingCardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  settingCardArrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;