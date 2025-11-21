const sharp = require('sharp');

class CalorieService {
  
  async predictCalories(imageBuffer) {
    // Process image with sharp for optimization
    const processedImage = await sharp(imageBuffer)
      .resize(640, 480, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Simulate AI processing time
    await this.delay(2000);
    
    return this.generatePrediction();
  }

  async predictCaloriesFromBase64(base64Data) {
    // Remove data URL prefix if present
    const base64Image = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    return this.predictCalories(imageBuffer);
  }

  generatePrediction() {
    const totalCalories = Math.floor(Math.random() * 400) + 200; // 200-600 calories
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100% confidence
    
    const foodItems = this.generateFoodItems(totalCalories);
    
    return {
      totalCalories,
      confidence,
      foodItems,
      macronutrients: this.calculateMacros(foodItems),
      timestamp: new Date().toISOString()
    };
  }

  generateFoodItems(totalCalories) {
    const foodDatabase = [
      { name: 'Rice', caloriesPerGram: 1.3, protein: 0.07, carbs: 0.28, fat: 0.003 },
      { name: 'Chicken Breast', caloriesPerGram: 1.65, protein: 0.31, carbs: 0, fat: 0.036 },
      { name: 'Broccoli', caloriesPerGram: 0.34, protein: 0.028, carbs: 0.07, fat: 0.004 },
      { name: 'Pasta', caloriesPerGram: 1.31, protein: 0.05, carbs: 0.25, fat: 0.011 },
      { name: 'Salmon', caloriesPerGram: 2.08, protein: 0.25, carbs: 0, fat: 0.12 },
      { name: 'Apple', caloriesPerGram: 0.52, protein: 0.003, carbs: 0.14, fat: 0.002 }
    ];
    
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
      
      const portionCalories = i === numItems - 1 ? 
        remainingCalories : 
        Math.floor(remainingCalories * (0.3 + Math.random() * 0.4));
      
      const weight = Math.round(portionCalories / food.caloriesPerGram);
      
      selectedFoods.push({
        name: food.name,
        calories: portionCalories,
        weight: weight,
        unit: 'g',
        protein: Math.round(weight * food.protein * 10) / 10,
        carbs: Math.round(weight * food.carbs * 10) / 10,
        fat: Math.round(weight * food.fat * 10) / 10
      });
      
      remainingCalories -= portionCalories;
    }
    
    return selectedFoods;
  }

  calculateMacros(foodItems) {
    const totals = foodItems.reduce((acc, item) => ({
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat
    }), { protein: 0, carbs: 0, fat: 0 });

    return {
      protein: Math.round(totals.protein * 10) / 10,
      carbs: Math.round(totals.carbs * 10) / 10,
      fat: Math.round(totals.fat * 10) / 10
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new CalorieService();