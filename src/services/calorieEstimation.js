// Simple calorie estimation service
class CalorieEstimationService {
  
  // Simulate AI calorie estimation based on image analysis
  estimateCalories(imageData) {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // Mock calorie estimation (in real app, this would call AI service)
        const estimatedCalories = Math.floor(Math.random() * 400) + 200; // 200-600 calories
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-100% confidence
        
        const foodItems = this.generateFoodItems(estimatedCalories);
        
        resolve({
          totalCalories: estimatedCalories,
          confidence: confidence,
          foodItems: foodItems,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    });
  }
  
  generateFoodItems(totalCalories) {
    const foodDatabase = [
      { name: 'Rice', caloriesPerGram: 1.3 },
      { name: 'Chicken Breast', caloriesPerGram: 1.65 },
      { name: 'Broccoli', caloriesPerGram: 0.34 },
      { name: 'Pasta', caloriesPerGram: 1.31 },
      { name: 'Salmon', caloriesPerGram: 2.08 },
      { name: 'Bread', caloriesPerGram: 2.65 },
      { name: 'Apple', caloriesPerGram: 0.52 },
      { name: 'Cheese', caloriesPerGram: 4.02 }
    ];
    
    // Randomly select 1-3 food items
    const numItems = Math.floor(Math.random() * 3) + 1;
    const selectedFoods = [];
    const usedIndices = new Set();
    
    let remainingCalories = totalCalories;
    
    for (let i = 0; i < numItems; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * foodDatabase.length);
      } while (usedIndices.has(randomIndex));
      
      usedIndices.add(randomIndex);
      const food = foodDatabase[randomIndex];
      
      // Calculate portion for this item
      const portionCalories = i === numItems - 1 ? 
        remainingCalories : 
        Math.floor(remainingCalories * (0.3 + Math.random() * 0.4));
      
      const weight = Math.round(portionCalories / food.caloriesPerGram);
      
      selectedFoods.push({
        name: food.name,
        calories: portionCalories,
        weight: weight,
        unit: 'g'
      });
      
      remainingCalories -= portionCalories;
    }
    
    return selectedFoods;
  }
}

export default new CalorieEstimationService();