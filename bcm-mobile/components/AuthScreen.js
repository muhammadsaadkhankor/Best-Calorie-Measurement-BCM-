import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const AuthScreen = ({ onLogin, globalTheme = 'Light' }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isDark = globalTheme === 'Dark';
  const themeStyles = {
    container: { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' },
    header: { backgroundColor: isDark ? '#2d2d2d' : '#4CAF50' },
    title: { color: isDark ? 'white' : '#333' },
    subtitle: { color: isDark ? '#ccc' : '#666' },
    input: { backgroundColor: isDark ? '#3d3d3d' : 'white', color: isDark ? 'white' : '#333', borderColor: isDark ? '#555' : '#ddd' },
    guestButtonText: { color: isDark ? '#ccc' : '#666' },
    guestButton: { borderColor: isDark ? '#ccc' : '#666' },
  };

  const handleAuth = () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isLogin) {
      // Simulate login
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => onLogin({ email, name: 'John Doe' }) }
      ]);
    } else {
      // Simulate signup
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => onLogin({ email, name }) }
      ]);
    }
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={[styles.header, themeStyles.header]}>
        <Text style={styles.logo}>🥗 BCM</Text>
        <Text style={styles.tagline}>Better Calories Measurement</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.title, themeStyles.title]}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
        <Text style={[styles.subtitle, themeStyles.subtitle]}>
          {isLogin ? 'Sign in to continue' : 'Join BCM today'}
        </Text>

        {!isLogin && (
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholderTextColor={isDark ? '#999' : '#666'}
          />
        )}

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={isDark ? '#999' : '#666'}
        />

        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={isDark ? '#999' : '#666'}
        />

        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Text>
        </TouchableOpacity>

        {isLogin && (
          <TouchableOpacity 
            style={styles.forgotButton} 
            onPress={() => {
              Alert.prompt(
                'Reset Password',
                'Enter your email address to receive reset instructions:',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Send Reset Link',
                    onPress: (resetEmail) => {
                      if (!resetEmail || !resetEmail.includes('@')) {
                        Alert.alert('Error', 'Please enter a valid email address');
                        return;
                      }
                      Alert.alert(
                        'Reset Link Sent',
                        `Password reset instructions have been sent to ${resetEmail}. Please check your email and follow the instructions to reset your password.`,
                        [{ text: 'OK' }]
                      );
                    }
                  }
                ],
                'plain-text',
                email
              );
            }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={[styles.guestButton, themeStyles.guestButton]} 
          onPress={() => onLogin({ email: 'guest@bcm.com', name: 'Guest User', isGuest: true })}
        >
          <Text style={[styles.guestButtonText, themeStyles.guestButtonText]}>Continue as Guest</Text>
        </TouchableOpacity>
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
    backgroundColor: '#4CAF50',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  form: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  authButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  authButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  switchText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  guestButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    marginTop: 20,
  },
  guestButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  forgotButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;