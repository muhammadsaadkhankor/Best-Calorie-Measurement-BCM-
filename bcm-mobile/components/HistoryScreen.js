import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';

const HistoryScreen = ({ onBack, globalTheme, mealHistory, setMealHistory }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const getHistoryData = () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayMeals = mealHistory.filter(meal => new Date(meal.timestamp) >= todayStart).map(meal => ({
      id: meal.id,
      time: new Date(meal.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      food: meal.foodItems?.map(f => f.name).join(', ') || 'Food',
      calories: Number(meal.totalCalories) || 0,
      protein: Number(meal.macronutrients?.protein) || 0,
      carbs: Number(meal.macronutrients?.carbs) || 0,
      fat: Number(meal.macronutrients?.fat) || 0
    }));

    const weekMeals = mealHistory.filter(meal => new Date(meal.timestamp) >= weekStart);
    const weekByDay = {};
    weekMeals.forEach(meal => {
      const date = new Date(meal.timestamp).toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      if (!weekByDay[date]) weekByDay[date] = { totalCalories: 0, meals: 0 };
      weekByDay[date].totalCalories += meal.totalCalories;
      weekByDay[date].meals++;
    });
    const weekData = Object.entries(weekByDay).map(([date, data], idx) => ({
      id: idx + 1,
      date: String(date),
      totalCalories: Number(data.totalCalories) || 0,
      meals: Number(data.meals) || 0
    }));

    const monthMeals = mealHistory.filter(meal => new Date(meal.timestamp) >= monthStart);
    const monthByWeek = {};
    monthMeals.forEach(meal => {
      const weekNum = Math.floor((now - new Date(meal.timestamp)) / (7 * 24 * 60 * 60 * 1000));
      const weekKey = `Week ${4 - weekNum}`;
      if (!monthByWeek[weekKey]) monthByWeek[weekKey] = { totalCalories: 0, totalMeals: 0 };
      monthByWeek[weekKey].totalCalories += meal.totalCalories;
      monthByWeek[weekKey].totalMeals++;
    });
    const monthData = Object.entries(monthByWeek).map(([week, data], idx) => ({
      id: idx + 1,
      week: String(week),
      avgCalories: Math.round(Number(data.totalCalories) / (Number(data.totalMeals) || 1)),
      totalMeals: Number(data.totalMeals) || 0
    }));

    return { Today: todayMeals, Week: weekData, Month: monthData };
  };

  const historyData = getHistoryData();

  const isDark = globalTheme === 'Dark';
  const themeStyles = {
    container: { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' },
    header: { backgroundColor: isDark ? '#2d2d2d' : '#4CAF50' },
    card: { backgroundColor: isDark ? '#2d2d2d' : 'white' },
    text: { color: isDark ? 'white' : '#333' },
    subtext: { color: isDark ? '#ccc' : '#666' },
    tabActive: { backgroundColor: isDark ? '#4CAF50' : '#4CAF50' },
    tabInactive: { backgroundColor: isDark ? '#3d3d3d' : '#f0f0f0' }
  };

  const deleteMeal = (mealId) => {
    Alert.alert(
      'Delete Meal',
      'Are you sure you want to delete this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMealHistory(prev => prev.filter(meal => meal.id !== mealId));
          }
        }
      ]
    );
  };

  const deleteToday = () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    setMealHistory(prev => prev.filter(meal => new Date(meal.timestamp) < todayStart));
    Alert.alert('Success', "Today's data has been deleted!");
  };

  const deleteWeek = () => {
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    setMealHistory(prev => prev.filter(meal => new Date(meal.timestamp) < weekStart));
    Alert.alert('Success', "This week's data has been deleted!");
  };

  const deleteAll = () => {
    setMealHistory([]);
    Alert.alert('Success', 'All data has been permanently deleted!');
  };

  const renderTodayItem = ({ item }) => (
    <View style={[styles.historyItem, themeStyles.card]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.itemTime, themeStyles.text]}>{String(item.time)}</Text>
        <Text style={styles.itemCalories}>{Number(item.calories) || 0} cal</Text>
      </View>
      <Text style={[styles.itemFood, themeStyles.text]}>{String(item.food)}</Text>
      <View style={styles.itemFooter}>
        <View style={styles.macros}>
          <Text style={styles.macro}>P: {Math.round(item.protein)}g</Text>
          <Text style={styles.macro}>C: {Math.round(item.carbs)}g</Text>
          <Text style={styles.macro}>F: {Math.round(item.fat)}g</Text>
        </View>
        <TouchableOpacity onPress={() => deleteMeal(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderWeekItem = ({ item }) => (
    <View style={[styles.historyItem, themeStyles.card]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.itemDate, themeStyles.text]}>{String(item.date)}</Text>
        <Text style={styles.itemCalories}>{Number(item.totalCalories) || 0} cal</Text>
      </View>
      <Text style={[styles.itemMeals, themeStyles.subtext]}>{Number(item.meals) || 0} meals logged</Text>
    </View>
  );

  const renderMonthItem = ({ item }) => (
    <View style={[styles.historyItem, themeStyles.card]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.itemWeek, themeStyles.text]}>{String(item.week)}</Text>
        <Text style={styles.itemCalories}>{Number(item.avgCalories) || 0} avg</Text>
      </View>
      <Text style={[styles.itemMeals, themeStyles.subtext]}>{Number(item.totalMeals) || 0} total meals</Text>
    </View>
  );

  const getTotalCalories = () => {
    if (selectedPeriod === 'Today') {
      return historyData.Today.reduce((sum, item) => sum + item.calories, 0);
    }
    return null;
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={[styles.header, themeStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        {['Today', 'Week', 'Month'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.tab,
              selectedPeriod === period ? themeStyles.tabActive : themeStyles.tabInactive
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[
              styles.tabText,
              { color: selectedPeriod === period ? 'white' : (isDark ? '#ccc' : '#666') }
            ]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedPeriod === 'Today' && getTotalCalories() !== null && getTotalCalories() > 0 && (
        <View style={[styles.summaryCard, themeStyles.card]}>
          <Text style={[styles.summaryTitle, themeStyles.text]}>Today's Total</Text>
          <Text style={styles.summaryCalories}>{getTotalCalories()} calories</Text>
        </View>
      )}

      {historyData[selectedPeriod].length > 0 ? (
        <FlatList
          data={historyData[selectedPeriod]}
          renderItem={selectedPeriod === 'Today' ? renderTodayItem : 
                     selectedPeriod === 'Week' ? renderWeekItem : renderMonthItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={[styles.emptyText, themeStyles.text]}>No meals logged yet</Text>
          <Text style={[styles.emptySubtext, themeStyles.subtext]}>Start tracking your meals to see history</Text>
        </View>
      )}
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
  tabContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  summaryCalories: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  itemDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemWeek: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemFood: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  itemMeals: {
    fontSize: 14,
    color: '#666',
  },
  macros: {
    flexDirection: 'row',
    gap: 16,
  },
  macro: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});

export default HistoryScreen;