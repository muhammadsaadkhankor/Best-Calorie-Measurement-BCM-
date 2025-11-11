import database from './database';

class MealService {
  addMeal(userId, meal) {
    return database.addMeal(userId, {
      ...meal,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });
  }

  getUserMeals(userId) {
    return database.getUserMeals(userId);
  }

  getTodaysMeals(userId) {
    return database.getTodaysMeals(userId);
  }

  getTotalCaloriesToday(userId) {
    return this.getTodaysMeals(userId).reduce((sum, meal) => sum + meal.calories, 0);
  }
}

export default new MealService();