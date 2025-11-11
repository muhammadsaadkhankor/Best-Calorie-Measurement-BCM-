import database from './database';

class AuthService {
  constructor() {
    this.currentUser = null;
  }

  signUp(userData) {
    try {
      const newUser = database.createUser(userData);
      this.currentUser = newUser;
      localStorage.setItem('bcm_currentUser', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  signIn(credentials) {
    try {
      const user = database.authenticateUser(credentials.email, credentials.password);
      this.currentUser = user;
      localStorage.setItem('bcm_currentUser', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  }

  signOut() {
    this.currentUser = null;
    localStorage.removeItem('bcm_currentUser');
  }

  getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    const savedUser = localStorage.getItem('bcm_currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      return this.currentUser;
    }
    
    return null;
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }
}

export default new AuthService();