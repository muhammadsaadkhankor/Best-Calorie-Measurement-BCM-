// Simple local database simulation using localStorage
class Database {
  constructor() {
    this.users = this.getUsers();
    this.meals = this.getMeals();
  }

  // User management
  getUsers() {
    const users = localStorage.getItem('bcm_users');
    return users ? JSON.parse(users) : [];
  }

  saveUsers() {
    localStorage.setItem('bcm_users', JSON.stringify(this.users));
  }

  createUser(userData) {
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      phone: userData.phone || '',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();
    return { ...newUser, password: undefined }; // Don't return password
  }

  authenticateUser(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    this.saveUsers();
    
    return { ...user, password: undefined }; // Don't return password
  }

  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    return user ? { ...user, password: undefined } : null;
  }

  // Meal management
  getMeals() {
    const meals = localStorage.getItem('bcm_meals');
    return meals ? JSON.parse(meals) : {};
  }

  saveMeals() {
    localStorage.setItem('bcm_meals', JSON.stringify(this.meals));
  }

  addMeal(userId, mealData) {
    if (!this.meals[userId]) {
      this.meals[userId] = [];
    }

    const meal = {
      id: Date.now().toString(),
      ...mealData,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };

    this.meals[userId].push(meal);
    this.saveMeals();
    return meal;
  }

  getUserMeals(userId) {
    return this.meals[userId] || [];
  }

  getTodaysMeals(userId) {
    const today = new Date().toDateString();
    const userMeals = this.getUserMeals(userId);
    return userMeals.filter(meal => meal.date === today);
  }
}

export default new Database();